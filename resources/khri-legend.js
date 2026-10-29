(function () {
  'use strict';
  const entries = [
    {layer: lyr_Traffic_Stations_CRN_4, name: 'Traffic stations', symbols: [['Traffic_Stations_CRN_4.png', 'Traffic survey station']]},
    {layer: lyr_IRI_CRNNetwork_3, name: 'Road roughness (IRI)', symbols: [['IRI_CRNNetwork_3_0.png', 'Fair'], ['IRI_CRNNetwork_3_1.png', 'Good'], ['IRI_CRNNetwork_3_2.png', 'Poor'], ['IRI_CRNNetwork_3_3.png', 'Other / unclassified']]},
    {layer: lyr_CRN_6000kmroad_network_2, name: 'Core Road Network', symbols: [['CRN_6000kmroad_network_2_1.png', 'MDR'], ['CRN_6000kmroad_network_2_2.png', 'SH'], ['CRN_6000kmroad_network_2_0.png', 'Other / unclassified']]},
    {layer: lyr_Nation_Highway_1, name: 'National highways', symbols: [['Nation_Highway_1.png', 'National highway']]},
    {layer: lyr_GoogleRoad_0, name: 'Google Road basemap', symbols: []}
  ];
  const panel = document.createElement('aside');
  panel.className = 'khri-legend';
  panel.setAttribute('aria-label', 'Map layers and legend');
  const heading = document.createElement('button');
  heading.type = 'button';
  heading.className = 'khri-legend-heading';
  heading.setAttribute('aria-expanded', 'true');
  heading.setAttribute('aria-controls', 'khri-legend-content');
  heading.textContent = 'Layers & legend  −';
  const content = document.createElement('div');
  content.id = 'khri-legend-content';
  content.className = 'khri-legend-content';
  const note = document.createElement('p');
  note.className = 'khri-legend-note';
  note.textContent = 'Tick to show a layer. Untick to hide it.';
  content.appendChild(note);
  entries.forEach(function (entry, index) {
    const group = document.createElement('section');
    group.className = 'khri-legend-layer';
    const label = document.createElement('label');
    label.className = 'khri-layer-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'khri-layer-' + index;
    checkbox.checked = entry.layer.getVisible();
    const name = document.createElement('span');
    name.textContent = entry.name;
    label.append(checkbox, name);
    group.appendChild(label);
    const symbols = document.createElement('ul');
    symbols.className = 'khri-symbols';
    entry.symbols.forEach(function (symbol) {
      const row = document.createElement('li');
      const img = document.createElement('img');
      img.src = 'styles/legend/' + symbol[0];
      img.alt = '';
      const text = document.createElement('span');
      text.textContent = symbol[1];
      row.append(img, text);
      symbols.appendChild(row);
    });
    group.appendChild(symbols);
    function sync() {
      checkbox.checked = entry.layer.getVisible();
      group.classList.toggle('khri-layer-off', !checkbox.checked);
    }
    checkbox.addEventListener('change', function () { entry.layer.setVisible(checkbox.checked); });
    entry.layer.on('change:visible', sync);
    sync();
    content.appendChild(group);
  });
  heading.addEventListener('click', function () {
    content.hidden = !content.hidden;
    heading.setAttribute('aria-expanded', String(!content.hidden));
    heading.textContent = content.hidden ? 'Layers & legend  +' : 'Layers & legend  −';
  });
  panel.append(heading, content);
  document.body.appendChild(panel);
})();
