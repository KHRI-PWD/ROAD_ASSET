ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:3857").setExtent([8424427.454275, 1246431.095518, 8548192.710476, 1312260.179972]);
var wms_layers = [];


        var lyr_GoogleRoad_0 = new ol.layer.Tile({
            'title': 'Google Road',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            })
        });
var format_Nation_Highway_1 = new ol.format.GeoJSON();
var features_Nation_Highway_1 = format_Nation_Highway_1.readFeatures(json_Nation_Highway_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Nation_Highway_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Nation_Highway_1.addFeatures(features_Nation_Highway_1);
var lyr_Nation_Highway_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Nation_Highway_1, 
                style: style_Nation_Highway_1,
                popuplayertitle: 'Nation_Highway',
                interactive: true,
                title: '<img src="styles/legend/Nation_Highway_1.png" /> Nation_Highway'
            });
var format_CRN_6000kmroad_network_2 = new ol.format.GeoJSON();
var features_CRN_6000kmroad_network_2 = format_CRN_6000kmroad_network_2.readFeatures(json_CRN_6000kmroad_network_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CRN_6000kmroad_network_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CRN_6000kmroad_network_2.addFeatures(features_CRN_6000kmroad_network_2);
var lyr_CRN_6000kmroad_network_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CRN_6000kmroad_network_2, 
                style: style_CRN_6000kmroad_network_2,
                popuplayertitle: 'CRN_6000km — road_network',
                interactive: true,
    title: 'CRN_6000km — road_network<br />\
    <img src="styles/legend/CRN_6000kmroad_network_2_0.png" /> <br />\
    <img src="styles/legend/CRN_6000kmroad_network_2_1.png" /> MDR<br />\
    <img src="styles/legend/CRN_6000kmroad_network_2_2.png" /> SH<br />' });
var format_IRI_CRNNetwork_3 = new ol.format.GeoJSON();
var features_IRI_CRNNetwork_3 = format_IRI_CRNNetwork_3.readFeatures(json_IRI_CRNNetwork_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_IRI_CRNNetwork_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_IRI_CRNNetwork_3.addFeatures(features_IRI_CRNNetwork_3);
var lyr_IRI_CRNNetwork_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_IRI_CRNNetwork_3, 
                style: style_IRI_CRNNetwork_3,
                popuplayertitle: 'IRI_CRN Network',
                interactive: true,
    title: 'IRI_CRN Network<br />\
    <img src="styles/legend/IRI_CRNNetwork_3_0.png" /> Fair<br />\
    <img src="styles/legend/IRI_CRNNetwork_3_1.png" /> Good<br />\
    <img src="styles/legend/IRI_CRNNetwork_3_2.png" /> Poor<br />\
    <img src="styles/legend/IRI_CRNNetwork_3_3.png" /> <br />' });
var format_Traffic_Stations_CRN_4 = new ol.format.GeoJSON();
var features_Traffic_Stations_CRN_4 = format_Traffic_Stations_CRN_4.readFeatures(json_Traffic_Stations_CRN_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Traffic_Stations_CRN_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Traffic_Stations_CRN_4.addFeatures(features_Traffic_Stations_CRN_4);
var lyr_Traffic_Stations_CRN_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Traffic_Stations_CRN_4, 
                style: style_Traffic_Stations_CRN_4,
                popuplayertitle: 'Traffic_Stations_CRN',
                interactive: true,
                title: '<img src="styles/legend/Traffic_Stations_CRN_4.png" /> Traffic_Stations_CRN'
            });

lyr_GoogleRoad_0.setVisible(true);lyr_Nation_Highway_1.setVisible(true);lyr_CRN_6000kmroad_network_2.setVisible(true);lyr_IRI_CRNNetwork_3.setVisible(true);lyr_Traffic_Stations_CRN_4.setVisible(true);
var layersList = [lyr_GoogleRoad_0,lyr_Nation_Highway_1,lyr_CRN_6000kmroad_network_2,lyr_IRI_CRNNetwork_3,lyr_Traffic_Stations_CRN_4];
lyr_Nation_Highway_1.set('fieldAliases', {'fid': 'fid', 'road_name': 'road_name', 'road_type': 'road_type', 'lane_statu': 'lane_statu', 'agency': 'agency', 'gis_length': 'gis_length', });
lyr_CRN_6000kmroad_network_2.set('fieldAliases', {'fid': 'fid', 'ID': 'ID', 'CRN': 'CRN', 'PWD_SEC': 'PWD Section', 'DISTRICT': 'DISTRICT', 'CONSTRTYPE': 'Construction Type', 'ROAD_NAME': 'Road Name', 'LANE_TYPE': 'Lane Type', 'CWAY': 'Carriageway', 'END_CH': 'End Chainage', 'MEASD_LEN': 'Measured Length', 'ROADENDLOC': 'Road End Location', 'ROADENDCH': 'Road End Chainage', 'RODSTRTLOC': 'Road Start Location', 'ROAD_CLASS': 'Road Class', 'SEC_LABEL': 'Section Label', 'START_CH': 'Start Chainage', 'ROAD_NO': 'Road Number', });
lyr_IRI_CRNNetwork_3.set('fieldAliases', {'fid': 'fid', 'ROAD': 'ROAD', 'FROM_CH_M': 'FROM_CH_M', 'TO_CH_M': 'TO_CH_M', 'LANE': 'LANE', 'LANES': 'LANES', 'LANE_LIST': 'LANE_LIST', 'IRI': 'IRI', 'RATING': 'RATING', });
lyr_Traffic_Stations_CRN_4.set('fieldAliases', {'fid': 'fid', 'STATION': 'STATION', 'ROAD': 'ROAD', 'SECTION': 'SECTION', 'CHAINAGE_M': 'CHAINAGE_M', 'LANE': 'LANE', 'SRVY_DAYS': 'Survey_days', 'TOT_VEH': 'Total_vehicles', 'ADT_PER_DY': 'ADT_veh_per_day', 'CV_PER_DAY': 'Commercial_veh_per_day', 'NOCMVEHDAY': 'Non_commercial_veh_per_day', 'NRTHVEHDAY': 'Northbound_veh_per_day', 'STHBVEHDAY': 'Southbound_veh_per_day', 'DATE_FROM': 'DATE_FROM', 'DATE_TO': 'DATE_TO', 'Total MSA': 'Total MSA', });
lyr_Nation_Highway_1.set('fieldImages', {'fid': 'TextEdit', 'road_name': 'TextEdit', 'road_type': 'TextEdit', 'lane_statu': 'TextEdit', 'agency': 'TextEdit', 'gis_length': 'TextEdit', });
lyr_CRN_6000kmroad_network_2.set('fieldImages', {'fid': 'TextEdit', 'ID': 'Range', 'CRN': 'TextEdit', 'PWD_SEC': 'TextEdit', 'DISTRICT': 'TextEdit', 'CONSTRTYPE': 'TextEdit', 'ROAD_NAME': 'TextEdit', 'LANE_TYPE': 'TextEdit', 'CWAY': 'TextEdit', 'END_CH': 'TextEdit', 'MEASD_LEN': 'Range', 'ROADENDLOC': 'TextEdit', 'ROADENDCH': 'Range', 'RODSTRTLOC': 'TextEdit', 'ROAD_CLASS': 'TextEdit', 'SEC_LABEL': 'TextEdit', 'START_CH': 'Range', 'ROAD_NO': 'Range', });
lyr_IRI_CRNNetwork_3.set('fieldImages', {'fid': 'TextEdit', 'ROAD': 'TextEdit', 'FROM_CH_M': 'Range', 'TO_CH_M': 'Range', 'LANE': 'TextEdit', 'LANES': 'Range', 'LANE_LIST': 'TextEdit', 'IRI': 'TextEdit', 'RATING': 'TextEdit', });
lyr_Traffic_Stations_CRN_4.set('fieldImages', {'fid': 'TextEdit', 'STATION': 'TextEdit', 'ROAD': 'TextEdit', 'SECTION': 'TextEdit', 'CHAINAGE_M': 'Range', 'LANE': 'TextEdit', 'SRVY_DAYS': 'Range', 'TOT_VEH': 'Range', 'ADT_PER_DY': 'Range', 'CV_PER_DAY': 'Range', 'NOCMVEHDAY': 'Range', 'NRTHVEHDAY': 'Range', 'STHBVEHDAY': 'Range', 'DATE_FROM': 'TextEdit', 'DATE_TO': 'TextEdit', 'Total MSA': 'TextEdit', });
lyr_Nation_Highway_1.set('fieldLabels', {'fid': 'inline label - always visible', 'road_name': 'inline label - always visible', 'road_type': 'inline label - always visible', 'lane_statu': 'inline label - always visible', 'agency': 'inline label - always visible', 'gis_length': 'inline label - always visible', });
lyr_CRN_6000kmroad_network_2.set('fieldLabels', {'fid': 'inline label - always visible', 'ID': 'inline label - always visible', 'CRN': 'inline label - always visible', 'PWD_SEC': 'inline label - always visible', 'DISTRICT': 'inline label - always visible', 'CONSTRTYPE': 'inline label - always visible', 'ROAD_NAME': 'inline label - always visible', 'LANE_TYPE': 'inline label - always visible', 'CWAY': 'inline label - always visible', 'END_CH': 'inline label - always visible', 'MEASD_LEN': 'inline label - always visible', 'ROADENDLOC': 'inline label - always visible', 'ROADENDCH': 'inline label - always visible', 'RODSTRTLOC': 'inline label - always visible', 'ROAD_CLASS': 'inline label - always visible', 'SEC_LABEL': 'inline label - always visible', 'START_CH': 'inline label - always visible', 'ROAD_NO': 'inline label - always visible', });
lyr_IRI_CRNNetwork_3.set('fieldLabels', {'fid': 'inline label - always visible', 'ROAD': 'inline label - always visible', 'FROM_CH_M': 'inline label - always visible', 'TO_CH_M': 'inline label - always visible', 'LANE': 'inline label - always visible', 'LANES': 'inline label - always visible', 'LANE_LIST': 'inline label - always visible', 'IRI': 'inline label - always visible', 'RATING': 'inline label - always visible', });
lyr_Traffic_Stations_CRN_4.set('fieldLabels', {'fid': 'inline label - always visible', 'STATION': 'inline label - always visible', 'ROAD': 'inline label - always visible', 'SECTION': 'inline label - always visible', 'CHAINAGE_M': 'inline label - always visible', 'LANE': 'inline label - always visible', 'SRVY_DAYS': 'inline label - always visible', 'TOT_VEH': 'inline label - always visible', 'ADT_PER_DY': 'inline label - always visible', 'CV_PER_DAY': 'inline label - always visible', 'NOCMVEHDAY': 'inline label - always visible', 'NRTHVEHDAY': 'inline label - always visible', 'STHBVEHDAY': 'inline label - always visible', 'DATE_FROM': 'inline label - always visible', 'DATE_TO': 'inline label - always visible', 'Total MSA': 'inline label - always visible', });
lyr_Traffic_Stations_CRN_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});