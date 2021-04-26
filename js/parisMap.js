//Map for Paris Project
//Victor Westrich

import {
  BaseMap,
  baseUrl,
  buildControl,
  buildLegend,
  colorMap,
  getColor,
  lang,
  setMarker,
  translation
} from './common.js'

class ParisMap extends BaseMap {
  build() {
    //Map
    //Init Map
    this.map = L.map(this.elementId).setView([48.856667, 2.351667], 5)

    const legend = buildLegend()
    legend.addTo(this.map)

    //Minimal
    //Carto DB No Labels
    var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
      subdomains: 'abcd',
      minZoom: 12,
      maxZoom: 17
    })

    //Traditional
    //Wikimedia
    var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
      minZoom: 12,
      maxZoom: 17
    }).addTo(this.map)

    //Layer Groups
    //Base Maps Container
    var baseMaps = {
      "Wikimedia" : Wikimedia,
      "Carto DB No Labels": CartoDB_PositronNoLabels
    };

    //Overlay Maps Container
    var overlayMaps = this.overlayNames(lang)


    //Paris 1733 Overlay
    let paris1733 = L.tileLayer(`${baseUrl}/raster/Tiles/{z}/{x}/{y}.png`, {
      minZoom: 12,
      maxZoom: 17,
      opacity: 0.7,
      bounds: [[48.890,2.41], [48.820,2.278]],
      attribution: 'Generated by TilesXYZ'
    })
    overlayMaps["<b>Paris 1733</b>"] = paris1733

    //Fetch Data
    //In the actual Map, Data would be Fetched via this Request
    const controlPromise =
    fetch(`${baseUrl}/geojson/visitsParisGeolocated.geojson`)
      .then(response => response.json())

    controlPromise.then(data => {
      buildControl(this.map, baseMaps, overlayMaps, data)
    })
  }

  //Function to Define Overlay Name
  overlayNames(lang) {
    if (lang==="fra") {
      var overlayMaps = {
        "Pitzler":"",
        "Harrach":"",
        "Corfey":"",
        "Knesebeck":"",
        "Sturm":"",
        "Neumann":"",
        "<b>Tous les voyageurs</b>":""
      }

      return overlayMaps
    } else if (lang==="de"){
      var overlayMaps = {
        "Pitzler":"",
        "Harrach":"",
        "Corfey":"",
        "Knesebeck":"",
        "Sturm":"",
        "Neumann":"",
        "<b>Alle Reisende</b>":""
      }

      return overlayMaps
    }
  }
}

export {
  ParisMap
}
