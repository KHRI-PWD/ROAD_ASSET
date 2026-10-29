# Kerala Highway Research Institute — Road Asset Data

This is a complete qgis2web-derived OpenLayers web map for GitHub Pages.

## Upload
Extract the ZIP. Copy its contents into the local GitHub Desktop repository folder. Keep index.html at the repository root beside layers and resources. Commit and Push origin. In GitHub Settings > Pages choose Deploy from a branch, main, /(root), Save. Upload the extracted files, not the ZIP. Replace the previous map files together. Hard-refresh the published page after deployment.

## Map use
- Bottom-left checkboxes switch the four data layers and the basemap on/off.
- IRI starts off and downloads only when selected. Progress is shown beside the layer. Loading continues if hidden; once loaded it is reused without downloading again.
- Click a visible road line or station marker to open a readable attribute table on the right. Up to 12 overlapping features are listed; zoom in or hide other layers to narrow the result.
- Traffic tables begin with station ID, road and chainage, followed by traffic totals and daily flows. Survey start/end dates have been removed from the actual exported traffic records. Survey duration remains.
- NH uses a dashed violet line, distinct from the existing green/yellow/red IRI colours. Legend symbols match these styles.
- Road numbers appear when sufficiently zoomed in.
- Full extent, location, distance measurement and scale controls are included. Turn Measure off to resume clicking for attributes. Location requires browser permission and may require HTTPS.

## Data and performance
197 NH features, 991 CRN features, 115,450 IRI features and 242 traffic stations are preserved. Geometry and attributes are unchanged except removal of traffic DATE_FROM and DATE_TO. Units not documented by the source are explicitly labelled source units rather than guessed.

Data files are split into chunks of approximately 4 MiB. Geometry parsing is batched, IRI loads on demand, styles are cached, pointer-hover hit tests are avoided, and display pixel density is capped at 1.5. This improves responsiveness but full IRI rendering still depends on the device and network. No geometry simplification or deletion was used. Basemap tiles require internet access.

Validation covered actual OpenLayers parsing, feature counts, geometry equality, switches, lazy loading, ordered table content and date removal. A full browser canvas/visual test was not available in the build environment. The map has not been deployed to your GitHub account.
