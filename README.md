# Kerala Highway Research Institute
## Road Asset Data

Interactive road asset map exported from QGIS using qgis2web (OpenLayers).

### Publish using GitHub Pages
1. Extract this ZIP on your computer.
2. Create a GitHub repository, for example `khri-road-assets`. For GitHub Free, use a public repository for Pages.
3. Choose **Add file > Upload files**. Upload the extracted files and folders, preserving their structure. `index.html` must be at the repository root, alongside `layers`, `styles`, `resources`, and `webfonts`. Do not upload the ZIP or place everything inside an extra parent folder.
4. Commit the files. If the browser upload times out, upload folders in separate batches, or use GitHub Desktop.
5. Open **Settings > Pages**. Set Source to **Deploy from a branch**, select **main** and **/(root)**, then Save.
6. Check the deployment in Actions, then open the website link shown on Settings > Pages.

Source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Packaging changes
- Added the KHRI title and Road Asset Data subheading.
- Split two oversized JavaScript data files into ordered parts under 25 MiB each.
- Updated index.html to load every part before the existing map scripts.
- Verified the reassembled GeoJSON objects match the originals, including feature order, attributes and coordinates.
- Preserved the existing layer styling, map controls and popup configuration.

### Loading performance
Splitting resolves GitHub per-file limits. It does not reduce the number of road vertices or the amount of data parsed by the browser. The full road dataset can take time to load, especially on mobile devices. This package has not been published to a GitHub account or tested on a live Pages URL.

When exporting again from QGIS, repeat the file splitting and header customisation; a fresh export will not contain these modifications.

### Legend and layer visibility
The bottom-left Layers & legend panel uses the original exported symbol images. Each of the four data layers and the basemap has an independent checkbox. Click the panel heading to collapse or expand. Unclassified categories retain their original exported symbols.
