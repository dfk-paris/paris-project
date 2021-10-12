# ARCHITRAVE Visualizations - Software
Vers. 1.0

date: 23/06/2021

## Scope and content
This repository contains the code and the data for the visualizations presented at
[https://architrave.eu](https://architrave.eu).

The visualizations were created as part of the collaborative research project "*ARCHITRAVE Kunst und Architektur in Paris und Versailles im Spiegel deutscher Reiseberichte des Barock / Art and Architecture in Paris and Versailles in the Mirror of German Travelogues of the Baroque Period*", funded by the DFG and the ANR (FRAL 2016 program). 

The conceptualization of the visualizations was done in three steps. The first one was focused on the design and prototyping. It was maintained by V. Westrich. The second one included the implementation and the final launch and was performed by DFK Paris under the responsibility of A. Klammt in collaboration with M. Schepp ([Wendig](https://wendig.io)). The third step was the implementation of the plugin with the geographic visualizations into the website architrave.eu. To do this, the code has to be introduced into the publication-workflow of SADE (*Scalable Architecture for Digital Editions*). Here the responsibilities are entirely up to the SUB Göttingen and the code of this step therefore does not form part of this repository.

All geodata are part of the scientific work of the aforementioned research project. For the presentation on the website, the data were converted from TEI-XML and CSV format into GeoJSON-files. These files can be used within the license of this dataset. 

---

To cite the geodata and the code correctly, please use: 

**Ziegler, Hendrik; Pioch, Alexandra, 2021, "ARCHITRAVE [mapvisualization : data & software]", [https://doi.org/10.11588/data/AT1QUR](https://doi.org/10.11588/data/AT1QUR), heiDATA**

---

For the project visit also : [https://github.com/dfk-paris/paris-project](https://github.com/dfk-paris/paris-project)

The dataset comprises code and data for 

1. visualize the **geodata** in respect three different topics:

a. the **itineraries of the travelogues** of Corfey, Harrach, Knesebeck, Neumann and Pitzler

b. the **sites and places mentioned** in Europe the six travelogues

c. the **sites and monuments in Paris and Versailles** mentioned in the six travelogues

d. the outlines of the Holy Roman Empire and the Kingdom of France around 1700

2. Crunching the data. 

The latter one is necessary, if the raw data - TEI XML edition of the travelogues changed.

3. Code for the visualization of the data

For **visualzing the data** [Leaflet.js](https://leafletjs.com/) Vers. 1.7.1 is used. The following plugins are applied:

* [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster) Vers. 1.4.1
* [Georaster-layer-for-leaflet](https://github.com/GeoTIFF/georaster-layer-for-leaflet) Vers. 1.5.4


## Datafiles and filepath in the dataset

| file | content |
|---|---|
| /svg | icons for different types of sites |
| /raster | empty file in case of deployment used to store the raster tiles of the historic map |
| /js  | javascript files for map visualization via Leaflet.js |
| /geojson  | <ul>**<li>itinerary.geojson </li><li>visitsEuropeGeolocated.geojson</li> <li>visitsParisGeolocated.json </li><li>numberedFeatureCollection.geojson</li></ul>** sites and places mentioned in the texts as points (attributes among others: Geocoordinates, reference to Wikidata-Elements) <ul><li> hrr1700.geojson </li><li>france1700.geojson </li><li>parismap.json</li></ul>  geometry of the Holy Roman Empire (polygon) and the Kingdom of France at 1700 (polygons) <br> outline of detailed map of Paris as kind of bounding box  <br>Georeference : EPSG 4326 - WGS 84 - geographic |
| /css | design for cluster marker |
| /architrave-data | functions and set up for data chrunching with raw data |
| parisMap.html | shows map of sites in Paris in your browser while runing jekyll |
| europeMap.html | shows map of sites in Europe in your browser while runing jekyll |
| numberedMap.html | shows map of intineraries in your browser while runing jekyll |
| README.md, license and files to run jekyll |  |



## Development

The repository includes a jekyll app to demo the map functionality. To use it,
install [ruby](https://www.ruby-lang.org) and do

```bash
gem install jekyll jekyll-theme-minimal
cd paris-project
jekyll serve --livereload
```

Add the four JSON-files stored separately to the file named geojson.
 
Then the demo page is available at

* http://localhost:4000/paris-project/numberedMap.html
* http://localhost:4000/paris-project/europeMap.html
* http://localhost:4000/paris-project/parisMap.html

## Deployment

A webpack configuration is included to produce a bundled version of the
JavaScript code for deployment. To use it, install nodejs (>= v12) and run

```bash
npm install
npm run build
```

... then find the bundle in `dist/main.js`.

The target application is an eXist-db application. Deployment is manual and
involves copying the files from this repository to the eXist-db platform.

## Data Crunching

This section is of relevance if a.) there are newer versions of the TEI-XML editions at the TextGrid Repository or elsewhere, or b.) for the documentation of the workflow.

The data for the geographical visualizations is generated with a set of python scripts from the project's edition xml and the register data (xml and csv (use the csv file (field delimiter: |, string delimiter: ") " )). To combine the data as GeoJSON, install [pyenv](https://github.com/pyenv/pyenv) and use

```bash
cd architrave-data
pyenv shell 3.6.9
pip install geopy bs4
python main.py

# and then to actually use the new data in the maps:
cd ..
cp architrave-data/data/output/*.geojson geojson/
```

The GeoJSON in architrave-data/data/output can then be copied to the `geojson/`
directory where it will be picked up from by the maps.


### Check version of text-edition and get the newest one

When using the data check out if there are new versions of the edited text available: 

* Visit [TextGrid Repository https://textgridrep.org/](https://textgridrep.org/)  
* place newer versions in `architrave-data/data/input/editions/`

Latest versions used for data crunching in this dataset:

| Short | language |Citation|
|---|---|---|
| Sturm 2019 | DE | TextGrid Repository (2019). Reiseanmerkungen von Leonhard Christoph Sturm, 1719. Reiseanmerkungen von Leonhard Christoph Sturm, 1719. Architrave. ARCHITRAVE. [https://hdl.handle.net/21.11113/0000-000C-4F29-F](https://hdl.handle.net/21.11113/0000-000C-4F29-F) |
|  | FR | TextGrid Repository (2019). Notes de voyage de Leonhard Christoph Sturm, 1719. Notes de voyage de Leonhard Christoph Sturm, 1719. Architrave. ARCHITRAVE. [https://hdl.handle.net/21.11113/0000-000C-4F5F-3](https://hdl.handle.net/21.11113/0000-000C-4F5F-3) |
| Corfey 2019 | DE | TextGrid Repository (2019). Reisejournal von Lambert Friedrich Corfey, 1698-1699. Reisejournal von Lambert Friedrich Corfey, 1698-1699. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-4F31-5 | 
|  | FR | TextGrid Repository (2019). Journal de voyage de Lambert Friedrich Corfey, 1698-1699. Journal de voyage de Lambert Friedrich Corfey, 1698-1699. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-4F41-3 | 
| Neumann 2019 | DE | TextGrid Repository (2019). Briefe der Parisreise von Balthasar Neumann, 1723. Briefe der Parisreise von Balthasar Neumann, 1723. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-4F35-1|
|  | FR | TextGrid Repository (2019). Lettres du voyage à Paris de Balthasar Neumann, 1723. Lettres du voyage à Paris de Balthasar Neumann, 1723. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-4F63-D | 
| Pitzler 2020 | DE | TextGrid Repository (2020). Reisebeschreibung von Christoph Pitzler, 1685-1687. Reisebeschreibung von Christoph Pitzler, 1685-1687. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-914D-A | 
|  | FR | TextGrid Repository (2020). Récit de voyage de Christoph Pitzler, 1685-1687. Récit de voyage de Christoph Pitzler, 1685-1687. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-9151-4 |
| Knesebeck 2021 | DE | TextGrid Repository (2021). Reisebeschreibung von Christian Friedrich Gottlieb von dem Knesebeck, um 1711-1713. Reisebeschreibung von Christian Friedrich Gottlieb von dem Knesebeck, um 1711-1713. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000E-501F-6 | 
|  | FR | TextGrid Repository (2021). Récit de voyage de Christian Friedrich Gottlieb von dem Knesebeck, vers 1711-1713. Récit de voyage de Christian Friedrich Gottlieb von dem Knesebeck, vers 1711-1713. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000E-50DE-E|
| Harrach 2021 | DE |TextGrid Repository (2019). Tagebuch des Grafen Ferdinand Bonaventura I. von Harrach vom Jahre 1697 und 1698 (German Edition). Tagebuch des Grafen Ferdinand Bonaventura I. von Harrach, 1697-1698. Architrave. ARCHITRAVE. https://hdl.handle.net/21.11113/0000-000C-4EF4-A | 
|  | FR | TextGrid Repository (2019). Journal du comte Ferdinand Bonaventure Ier de Harrach, 1697-1698. Journal du comte Ferdinand Bonaventure Ier de Harrach, 1697-1698. Architrave. Journal du comte Ferdinand Bonaventure Ier de Harrach, 1697-1698. https://hdl.handle.net/21.11113/0000-000C-4EF0-E |

### Update the register-files

When there are newer text-editions, which entail modifications of spatial data, make sure to renew your register files. 
The files register.csv and register.xml orginially derivated from a spreadsheet, that does not form part of this data set. 
Therefore you may 

a.) add your changes manually to the existing register-files in this repository 

or 

b.) entirely reproduce the files and replace `architrave-data/data/input/register/places.xml` and `architrave-data/data/input/architrave-data/data/input/PlacesRegister_current.csv`. 

In the case of b.) 

* your XML-register file should follow this example:

```XML
<place xml:id="textgrid:3pff1" type="identified" subtype="domestic">
<idno xml:base="https://www.wikidata.org/wiki/Q3145712" type="wikidata"/>
<placeName type="historical" xml:lang="fra">hôtel d’Angoulême</placeName>
<placeName type="historical" xml:lang="de">Hôtel d’Angoulême</placeName>
<placeName type="current" xml:lang="fra">Paris, hôtel Lamoignon</placeName>
<placeName type="current" xml:lang="de">Paris, Hôtel Lamoignon</placeName>
<note type="state" xml:lang="fra">conservé</note>
<note type="state" xml:lang="de">erhalten</note>
<note type="function" xml:lang="fra">hôtel particulier</note>
<note type="function" xml:lang="de">Hôtel particulier</note>
<note type="artist">
<persName><Delorme, Philibert (https://viaf.org/viaf/205549982)></persName>
<persName><Métezeau, Thibault (https://www.wikidata.org/wiki/Q3524037)></persName>
<persName><Thiriot, Jean (https://viaf.org/viaf/247691052)></persName>
</note>
<note type="event" xml:lang="fra">1585 : début des travaux ; 1589 : fin des travaux ; 1624-1640 : modifications</note>
<note type="event" xml:lang="de">1585: Baubeginn; 1589: Bauende; 1624-1640: Umbauphase</note>
<location>
<geo>48.85703, 2.361833</geo>
</location>
<note type="description" xml:lang="fra"><p>L’hôtel Lamoignon est construit à la fin du ... </p></note>
<note type="description" xml:lang="de"><p>Das Hôtel Lamoignon wurde Ende des 16 ... </p></note>
</place> 
```

* the CSV-file should follow the example of `/architrave-data/data/input/PlacesRegister_current.csv`



### get raster data of historical map

For visualizing the historical situation, the map uses a georectified scan of the plan "Neuvième plan de Paris. Ses accroissemens sous le règne de Louis XV" by Jean Delagrive, Le Cler Du Brillet and Nicolas de La Mare (authors) as offered by the [David Rumsfield map collection](https://www.davidrumsey.com/). For displaying the map on the website, it has been tiled by using the QGIS algorithm to generate XYZ-tiles (directory) (see [24.1.11.3. Generate XYZ tiles (Directory)](https://docs.qgis.org/3.16/en/docs/user_manual/processing_algs/qgis/rastertools.html#generate-xyz-tiles-directory) QGIS Documentation v. 3.16). 

* Use 

```Code 
Minimum Zoom: 11 , Maximum Zoom: 17, DPI: 96, Tile Format: PNG 
``` 

* place the resulting files in `paris-project/raster/Tiles/`
