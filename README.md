# Kerala Highway Research Institute — Road Asset Data

This is a complete qgis2web-derived OpenLayers web map for GitHub Pages.

## Upload
Extract the ZIP. Copy its contents into the local GitHub Desktop repository folder. Keep index.html at the repository root beside layers and resources. Commit and Push origin. In GitHub Settings > Pages choose Deploy from a branch, main, /(root), Save. Upload the extracted files, not the ZIP. Replace the previous map files together. Hard-refresh the published page after deployment.

## Map use
- Bottom-left checkboxes switch the five data layers and the Google Road / Google Satellite / Google Satellite Hybrid basemaps on/off.
- IRI starts off and downloads only when selected. Progress is shown beside the layer. Loading continues if hidden; once loaded it is reused without downloading again.
- Click a visible road line or station marker to open a readable attribute table on the right. Up to 12 overlapping features are listed; zoom in or hide other layers to narrow the result.
- Traffic tables begin with station ID, road and chainage, followed by traffic totals and daily flows. Survey start/end dates have been removed from the actual exported traffic records. Survey duration remains.
- NH uses a thick dashed violet line (#6d28d9), SH a solid blue line (#0077b6), MDR a bright ivory line (#fff4df, 3.5 px) with a dark outline (5.5 px) for visibility on satellite imagery, and traffic stations magenta diamonds (#c026d3) with white borders. The IRI palette is unchanged. A softened basemap helps these symbols stand out. Legend symbols match the map styles.
- Road numbers appear when sufficiently zoomed in.
- Full extent, location, distance measurement and scale controls are included. Turn Measure off to resume clicking for attributes. Location requires browser permission and may require HTTPS.

## Data and performance
197 NH features, 991 CRN features, 115,450 IRI features and 242 traffic stations are preserved. Geometry and attributes are unchanged except removal of traffic DATE_FROM and DATE_TO. Units not documented by the source are explicitly labelled source units rather than guessed.

Data files are split into chunks of approximately 4 MiB. Geometry parsing is batched, IRI loads on demand, styles are cached, pointer-hover hit tests are avoided, and display pixel density is capped at 1.5. This improves responsiveness but full IRI rendering still depends on the device and network. No geometry simplification or deletion was used. Basemap tiles require internet access.

Validation covered actual OpenLayers parsing, feature counts, geometry equality, switches, lazy loading, ordered table content and date removal. A full browser canvas/visual test was not available in the build environment. The map has not been deployed to your GitHub account.

## Classification audit
All 197 NH records are National Highway. All 991 CRN records are classified (521 SH, 470 MDR). All 115,450 IRI records are classified (24,948 Good, 27,611 Fair, 62,891 Poor). There are no unclassified data records to delete. Unclassified fallback styles and legend entries have been removed; all valid records and their geometries remain unchanged.

## Updated CRN and MSA
Core Road Network has been replaced using Road Network CRN.gpkg, layer Road Network CRN (EPSG:4326). All 991 source geometries and 18 non-geometry attributes are preserved. The new ROADSTRTCH field is included in the ordered popup table.

MSA is an independent point layer above Traffic stations in the legend and map draw order. Its 57 points use existing non-negative numeric Total MSA values from the traffic dataset, with the original station locations. No new MSA calculations or interpolations are performed. The 185 stations without an MSA value remain in Traffic stations and are excluded only from MSA. MSA uses a teal ring with a white outline around the smaller magenta traffic diamond. Click the ring or station to see the visible layers' attribute tables, including Total MSA in million standard axles. Each layer has an independent switch.

## Satellite basemap
Select Google Satellite in the bottom-left layer panel for aerial imagery. Selecting a basemap switches the other basemaps off; uncheck the selected basemap for a blank background. All five data overlay controls remain independent. Google Road remains the default. This is a 2D satellite basemap, not the Google Earth 3D application. Internet access is required for basemap tiles; imagery availability and detail vary by location.

Google Satellite Hybrid adds place names and road labels over satellite imagery. It has its own checkbox in the bottom-left panel. Only one basemap is active at a time, and all can be switched off. Road, IRI, traffic and MSA overlay controls remain independent.
