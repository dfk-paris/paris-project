# Architrave Maps

This repository contains the code and the dtaa for the maps in
https://architrave.eu.

## Maps

# Development
## jekyll
## webpack

# Deployment
## jekyll
## webpack

## Development

The repository includes a jekyll app to demo the map functionality. To use it,
install [ruby](https://www.ruby-lang.org) and do

```bash
gem install jekyll jekyll-theme-minimal
cd paris-project
git checkout gh-pages
jekyll serve --livereload
```

Then the demo page is available at

* http://localhost:4000/paris-project/numberedMap.html
* http://localhost:4000/paris-project/europeMap.html
* http://localhost:4000/paris-project/parisMap.html

## Deployment

A webpack configuration is included to produce a bundled version of the
JavaScript code for deployment. Install nodejs (v12) and run

    npm run build

And find the bundle in `dist/main.js`.

The target application is an eXist-db application. Deployment is manual and
involves copying the files from this repository to the eXist-db platform
manually.

## Data Crunching

The data for the maps is generated with a set of python scripts from the
project's edition xml and the register data (xml and csv). To combine the data
as geojson, install [pyenv](https://github.com/pyenv/pyenv) and use

```bash
cd architrave-data
pyenv shell 3.6.9
pip install geopy bs4
python main.py
```

The geojson in architrave-data/data/output can then be copied to the `geojson/`
directory where it will be picked up from by the maps.

### How to get new edition xml

* "export" via TextGridLab (German only, without Sturm)
* use results to replace architrave-data/data/input/editions/*

### How to get new register csv

* visit the team's register google sheet
* download as .ods
* open the ods and "save a copy" as .csv (field delimiter: |, string delimiter: ")
* use result to replace architrave-data/data/input/PlacesRegister_current.csv

### How to get new register xml

* visit https://gitlab.gwdg.de/ARCHITRAVE/SADE/-/tree/staging/templates/register
* download places.xml
* use result to replace architrave-data/data/input/register/places.xml