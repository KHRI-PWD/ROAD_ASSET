(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const defs = [
    {id:'traffic',name:'Traffic stations',symbols:[['#edf932','Survey station','point']]},
    {id:'iri',name:'Road roughness · IRI',symbols:[['#c2e40f','Good'],['#199108','Fair'],['#f70f2c','Poor'],['#cd9f7d','Other / unclassified']]},
    {id:'crn',name:'Core Road Network',symbols:[['#1111d1','SH'],['#130606','MDR'],['#8771d6','Other / unclassified']]},
    {id:'nh',name:'National highways',symbols:[['#7c3aed','NH · dashed violet','dash']]}
  ];
  const fields = {
    traffic:[['STATION','Station ID'],['ROAD','Road name'],['SECTION','Road / section code'],['CHAINAGE_M','Chainage (m)'],['LANE','Survey lane'],['SRVY_DAYS','Survey duration (days)'],['TOT_VEH','Total vehicles (survey period)'],['ADT_PER_DY','Average daily traffic (veh/day)'],['CV_PER_DAY','Commercial vehicles / day'],['NOCMVEHDAY','Non-commercial vehicles / day'],['NRTHVEHDAY','Northbound vehicles / day'],['STHBVEHDAY','Southbound vehicles / day'],['Total MSA','Total MSA'],['fid','Record ID']],
    iri:[['ROAD','Road code'],['FROM_CH_M','Start chainage (m)'],['TO_CH_M','End chainage (m)'],['IRI','IRI'],['RATING','Condition rating'],['LANE','Survey lane'],['LANES','Number of lanes'],['LANE_LIST','Lane list'],['fid','Record ID']],
    crn:[['ROAD_NAME','Road name'],['ROAD_CLASS','Road class'],['ROAD_NO','Road number'],['CRN','CRN'],['DISTRICT','District'],['PWD_SEC','PWD section'],['SEC_LABEL','Section label'],['START_CH','Start chainage (source units)'],['END_CH','End chainage (source units)'],['MEASD_LEN','Measured length (source units)'],['RODSTRTLOC','Start location'],['ROADENDLOC','End location'],['ROADENDCH','Road-end chainage (source units)'],['LANE_TYPE','Lane type'],['CWAY','Carriageway (source units)'],['CONSTRTYPE','Construction type'],['ID','Asset ID'],['fid','Record ID']],
    nh:[['road_name','Road name'],['road_type','Road type'],['lane_statu','Lane status'],['agency','Maintaining agency'],['gis_length','GIS length (source units)'],['fid','Record ID']]
  };
  const line = (color,width,dash) => new ol.style.Style({stroke:new ol.style.Stroke({color,width,lineDash:dash})});
  const styles = {
    nh:line('#7c3aed',3,[10,5]),
    crn:{SH:line('#1111d1',3.2),MDR:line('#130606',2.5),other:line('#8771d6',1.5)},
    iri:{Good:line('#c2e40f',2.1),Fair:line('#199108',2.1),Poor:line('#f70f2c',2.1),other:line('#cd9f7d',2.1)},
    traffic:new ol.style.Style({image:new ol.style.Circle({radius:6,fill:new ol.style.Fill({color:'#edf932'}),stroke:new ol.style.Stroke({color:'#325780',width:1.5})})})
  };
  const roadLabelCache = new Map();
  function crnStyle(feature,resolution){
    const base=styles.crn[feature.get('ROAD_CLASS')]||styles.crn.other;
    const number=feature.get('ROAD_NO');
    if(resolution>20||number==null||number==='')return base;
    const key=String(feature.get('ROAD_CLASS'))+'|'+String(number);
    if(!roadLabelCache.has(key)){const style=base.clone();style.setText(new ol.style.Text({text:String(number),font:'12px Arial',placement:'line',fill:new ol.style.Fill({color:'#6b214a'}),stroke:new ol.style.Stroke({color:'#ffffff',width:3})}));roadLabelCache.set(key,style);}
    return roadLabelCache.get(key);
  }
  const states={};
  defs.forEach((d,i)=>{const source=new ol.source.Vector();const layer=new ol.layer.Vector({source,visible:d.id!=='iri',updateWhileAnimating:false,updateWhileInteracting:false,style:d.id==='crn'?crnStyle:d.id==='iri'?f=>(styles.iri[f.get('RATING')]||styles.iri.other):styles[d.id]});layer.set('khriId',d.id);layer.setZIndex(10-i);states[d.id]={source,layer,loaded:false,loading:false,error:null,count:0,nextPart:0};});
  const basemap=new ol.layer.Tile({source:new ol.source.XYZ({url:'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',attributions:'Map data © Google',crossOrigin:'anonymous'})});
  const map=new ol.Map({target:'map',layers:[basemap,states.nh.layer,states.crn.layer,states.iri.layer,states.traffic.layer],view:new ol.View({center:ol.proj.fromLonLat([76.5,10.2]),zoom:8,minZoom:5,maxZoom:22}),pixelRatio:Math.min(window.devicePixelRatio||1,1.5)});
  window.map=map;
  map.addControl(new ol.control.ScaleLine());
  const fit=()=>{const ext=ol.extent.createEmpty();['nh','crn','traffic'].forEach(id=>{if(states[id].count)ol.extent.extend(ext,states[id].source.getExtent());});if(!ol.extent.isEmpty(ext))map.getView().fit(ext,{padding:window.innerWidth<650?[30,20,40,20]:[40,60,60,310],duration:300,maxZoom:12});};
  $('fit-map').onclick=fit;
  let located;
  $('locate').onclick=()=>{if(!navigator.geolocation){$('notice').textContent='Location is not supported in this browser.';return;}navigator.geolocation.getCurrentPosition(p=>{const coord=ol.proj.fromLonLat([p.coords.longitude,p.coords.latitude]);map.getView().animate({center:coord,zoom:15,duration:400});$('notice').textContent='Location accuracy: approximately '+Math.round(p.coords.accuracy)+' m.';},()=>{$('notice').textContent='Location unavailable. Allow location access or use the map manually.';});};
  const format=new ol.format.GeoJSON();
  const pause=()=>new Promise(r=>setTimeout(r,0));
  const script=(part)=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=part.file;s.onload=()=>{s.remove();resolve();};s.onerror=()=>{s.remove();reject(new Error('Could not load '+part.file));};document.head.appendChild(s);});
  async function loadLayer(id){const state=states[id];if(state.loaded||state.loading)return;state.loading=true;state.error=null;update(id);
    try{const parts=KHRI_MANIFEST[id].parts;for(;state.nextPart<parts.length;state.nextPart++){const part=parts[state.nextPart];await script(part);const rows=KHRI_CHUNKS[part.key];if(!Array.isArray(rows))throw new Error('Missing data in '+part.file);for(let n=0;n<rows.length;n+=350){const features=format.readFeatures({type:'FeatureCollection',features:rows.slice(n,n+350)},{dataProjection:'EPSG:4326',featureProjection:'EPSG:3857'});state.source.addFeatures(features);state.count+=features.length;update(id);await pause();}delete KHRI_CHUNKS[part.key];}state.loaded=true;}catch(e){state.error=e.message;$('notice').textContent=e.message+'. Keep all extracted folders together; select the layer again to retry.';}finally{state.loading=false;update(id);}}
  function update(id){const s=states[id],el=$('state-'+id);if(!el)return;el.textContent=s.error?'Load failed — toggle to retry':s.loading?'Loading '+s.count.toLocaleString()+' / '+KHRI_MANIFEST[id].count.toLocaleString():s.loaded?s.count.toLocaleString()+' features':'Loads when selected';el.classList.toggle('error',!!s.error);}
  const list=$('layer-list');
  defs.forEach(d=>{const section=document.createElement('section');section.className='layer-row';const label=document.createElement('label'),check=document.createElement('input'),title=document.createElement('span');check.type='checkbox';check.id='toggle-'+d.id;check.checked=states[d.id].layer.getVisible();title.textContent=d.name;label.append(check,title);section.append(label);const status=document.createElement('small');status.id='state-'+d.id;section.append(status);const ul=document.createElement('ul');d.symbols.forEach(([color,name,type])=>{const li=document.createElement('li'),symbol=document.createElement('span');symbol.className='symbol '+(type||'line');symbol.style.setProperty('--symbol',color);li.append(symbol,document.createTextNode(name));ul.append(li);});section.append(ul);list.append(section);check.onchange=()=>{states[d.id].layer.setVisible(check.checked);section.classList.toggle('off',!check.checked);$('attributes').hidden=true;if(check.checked)loadLayer(d.id);map.render();};states[d.id].layer.on('change:visible',()=>{check.checked=states[d.id].layer.getVisible();section.classList.toggle('off',!check.checked);});section.classList.toggle('off',!check.checked);update(d.id);});
  $('toggle-base').onchange=e=>{basemap.setVisible(e.target.checked);map.render();};
  $('legend-title').onclick=()=>{const hidden=!$('legend-body').hidden;$('legend-body').hidden=hidden;$('legend-title').setAttribute('aria-expanded',String(!hidden));};
  const hiddenKeys=new Set(['geometry','DATE_FROM','DATE_TO']);
  function display(value,key){if(value===null||value===undefined||value==='')return 'Not recorded';if(typeof value==='number')return value.toLocaleString('en-IN',{maximumFractionDigits:3});return String(value);}
  function renderAttributes(hits){const area=$('attribute-body');area.replaceChildren();$('attributes').hidden=false;$('selected-count').textContent=hits.length?hits.length+' feature'+(hits.length>1?'s':'')+' selected':'No feature selected';
    if(!hits.length){const p=document.createElement('p');p.textContent='Zoom in and click a visible road line or traffic station. The IRI layer must be selected to inspect its attributes.';area.append(p);return;}
    hits.forEach(({feature,id})=>{const block=document.createElement('section'),head=document.createElement('h3');head.textContent=defs.find(d=>d.id===id).name;block.append(head);const table=document.createElement('table'),thead=document.createElement('thead'),hr=document.createElement('tr');['Attribute','Value'].forEach(t=>{const th=document.createElement('th');th.textContent=t;th.scope='col';hr.append(th);});thead.append(hr);table.append(thead);const tbody=document.createElement('tbody');const properties=feature.getProperties(),ordered=fields[id].slice(),known=new Set(ordered.map(x=>x[0]));Object.keys(properties).filter(k=>!known.has(k)&&!hiddenKeys.has(k)).forEach(k=>ordered.push([k,k.replaceAll('_',' ')]));ordered.forEach(([key,title])=>{if(!(key in properties)||hiddenKeys.has(key))return;const tr=document.createElement('tr'),th=document.createElement('th'),td=document.createElement('td');th.scope='row';th.textContent=title;td.textContent=display(properties[key],key);tr.append(th,td);tbody.append(tr);});table.append(tbody);block.append(table);area.append(block);});}
  let measuring=false,draw;
  const measureSource=new ol.source.Vector(),measureLayer=new ol.layer.Vector({source:measureSource,style:line('#087f8c',3,[5,4])});measureLayer.setZIndex(100);map.addLayer(measureLayer);
  $('measure').onclick=()=>{measuring=!measuring;$('measure').setAttribute('aria-pressed',String(measuring));if(draw){map.removeInteraction(draw);draw=null;}if(!measuring){measureSource.clear();$('notice').textContent='Click a road or station to inspect attributes.';return;}measureSource.clear();$('notice').textContent='Click to draw a measurement. Double-click to finish.';draw=new ol.interaction.Draw({source:measureSource,type:'LineString'});draw.on('drawend',e=>{$('notice').textContent='Measured distance: '+(ol.sphere.getLength(e.feature.getGeometry())/1000).toFixed(3)+' km. Turn Measure off to inspect roads.';});map.addInteraction(draw);};
  map.on('singleclick',evt=>{if(measuring)return;const hits=[],seen=new Set();map.forEachFeatureAtPixel(evt.pixel,(feature,layer)=>{const id=layer&&layer.get('khriId');if(!id||!layer.getVisible()||seen.has(feature))return;seen.add(feature);hits.push({feature,id});return hits.length>=12?true:undefined;},{hitTolerance:8,layerFilter:l=>!!l.get('khriId')&&l.getVisible()});renderAttributes(hits);});
  $('close-attributes').onclick=()=>{$('attributes').hidden=true;};
  window.addEventListener('resize',()=>map.updateSize());
  window.KHRI={states,map,basemap,loadLayer,renderAttributes,fields};
  (async()=>{await loadLayer('traffic');await loadLayer('nh');await loadLayer('crn');fit();if(!['traffic','nh','crn'].some(id=>states[id].error))$('notice').textContent='Click a road or station to inspect attributes. Select IRI when needed.';})();
})();
