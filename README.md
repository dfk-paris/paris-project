# ARCHITRAVE Maps

This repository contains the code and the data for the visualizations at
[https://architrave.eu](https://architrave.eu).

The visualizations were created as part of the collaborative research project "*ARCHITRAVE Kunst und Architektur in Paris und Versailles im Spiegel deutscher Reiseberichte des Barock / Art and Architecture in Paris and Versailles in the Mirror of German Travelogues of the Baroque Period*", funded by the DFG and the ANR (FRAL 2016 program). 

The conceptualization of the visualizations was done in two steps. The first one was focused on the design and prototyping. It was maintained by V. Westrich ([https://github.com/vwestric/](https://github.com/vwestric/)). The second one included the implementation and the final launch and was performed by DFK Paris under the responsibility of A. Klammt in collaboration with M. Schepp (Wendig).

All geodata are part of the scientific work of the forementioned research project. For the presentation on the website, the data were converted from TEI-XML and CSV formats into GeoJSON files. These GeoJSON files can be used within the license of this repository. 

To cite them correctly, please use: Ziegler, Hendrik; Pioch, Alexandra, 2021, "ARCHITRAVE [research data & software]", https://doi.org/10.11588/data/AT1QUR, heiDATA, DRAFT VERSION 

      

## Development

The repository includes a jekyll app to demo the map functionality. To use it,
install [ruby](https://www.ruby-lang.org) and do

```bash
gem install jekyll jekyll-theme-minimal
cd paris-project
jekyll serve --livereload
```

Then the demo page is available at

* http://localhost:4000/paris-project/numberedMap.html
* http://localhost:4000/paris-project/europeMap.html
* http://localhost:4000/paris-project/parisMap.html

## Deployment

A webpack configuration is included to produce a bundled version of the
JavaScript code for deployment. To use it, install nodejs (v12) and run

```bash
npm install
npm run build
```

... then find the bundle in `dist/main.js`.

The target application is an eXist-db application. Deployment is manual and
involves copying the files from this repository to the eXist-db platform.

## Data Crunching

The data for the maps is generated with a set of python scripts from the
project's edition xml and the register data (xml and csv). To combine the data
as geojson, install [pyenv](https://github.com/pyenv/pyenv) and use

```bash
cd architrave-data
pyenv shell 3.6.9
pip install geopy bs4 lxml
python main.py

# and then to actually use the new data in the maps:
cd ..
cp architrave-data/data/output/*.geojson geojson/
```

The geojson in architrave-data/data/output can then be copied to the `geojson/`
directory where it will be picked up from by the maps.

### How to get new edition xml

* "export" via TextGridLab (German only, without Sturm)
* use results to replace architrave-data/data/input/editions/*

<!--### How to get new register csv

* visit the team's register google sheet
* download as .ods
* open the ods and "save a copy" as .csv (field delimiter: |, string delimiter: ")
* use result to replace architrave-data/data/input/PlacesRegister_current.csv -->

<!-- Ich kann mir gerade nicht vorstellen, dass es die Google Spreadsheets öffentlich zugänglich geben wird. Idealerweise müssten sie eigentlich mit in das Textgridrepo.-->

### How to get new register xml

* visit https://gitlab.gwdg.de/ARCHITRAVE/SADE/-/tree/staging/templates/register
* download places.xml
* use result to replace architrave-data/data/input/register/places.xml
