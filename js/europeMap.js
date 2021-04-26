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
  onEachFeature,
  setMarker,
  translation
} from './common.js'

class EuropeMap extends BaseMap {
  build() {
    //Map
    //Init Map
    // we disable animations on the initial page load to fix a conflict with
    // the marker cluster lib
    this.map = L.
      map(this.elementId, {
        minZoom: 6,
        maxZoom: 18,
      }).
      setView([48.856667, 2.351667], 1, {zoomAnimation: false});

    const legend = buildLegend()
    legend.addTo(this.map)

    //Polygon Styles
    var franceStyle = {
        "color": "#013896",
        "weight": 1,
        "opacity": 0
    };

    var hrrStyle = {
        "color": "#860018",
        "weight": 1,
        "opacity": 0
    };

    var parismapStyle = {
        "color": "#808080",
        "weight": 1,
        "opacity": 0.5
    };

    //Minimal
    //Carto DB No Labels
    var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
    	subdomains: 'abcd',
    	minZoom:6,
    	maxZoom: 19
    });

    //Traditional
    //Wikimedia
    var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    	attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
    	minZoom: 6,
    	maxZoom: 19
    }).addTo(this.map);

    //Overlay Name
    var franceLabel = this.overlayName("france", lang);
    var hreLabel = this.overlayName("hrr", lang);
    var parismapLabel = this.overlayName("parismap", lang);

    //Layer Groups
    //Base Maps Container
    var baseMaps = {
      "Wikimedia" : Wikimedia,
      "Carto DB No Labels": CartoDB_PositronNoLabels
    };

    //Overlay Maps
    var overlayMaps = this.overlayNames(lang);

    //France Polygon
    let francePromise =
      fetch(`${baseUrl}/geojson/france1700.geojson`)
      .then(response => response.json())
      .then(data => {
        var france = L.layerGroup([L.geoJSON(data, {style: franceStyle})]);
        overlayMaps[franceLabel] = france
      });

    //Empire Polygon
    let hrePromise =
      fetch(`${baseUrl}/geojson/hrr1700.geojson`)
      .then(response => response.json())
      .then(data => {
        var hrr = L.layerGroup([L.geoJSON(data, {style: hrrStyle})]);
        overlayMaps[hreLabel] = hrr
      });

    //Paris Polygon
    let parismapPromise =
      fetch(`${baseUrl}/geojson/parismap.geojson`)
      .then(response => response.json())

    //Fetch Data
    //In the actual Map, Data would be Fetched via this Request
    let controlPromise =
      fetch(`${baseUrl}/geojson/visitsEuropeGeolocated.geojson`)
      .then(response => response.json())

    // wait for all requests to return, then set up the control panel
    Promise.all([francePromise, hrePromise, controlPromise]).then(data => {
      const [franceData, hreData, controlData] = data
      const control = buildControl(this.map, baseMaps, overlayMaps, controlData)
      this.hideHistoric(this.map, control, franceLabel, hreLabel, overlayMaps)
    })

    // wait for paris map boundary data, then add layer to map and attach zoom
    // handler
    parismapPromise.then(data => {
      const threshold = 10
      var parismap = L.layerGroup([L.geoJSON(data, {style: parismapStyle})]);
      let active = false

      this.map.on('zoomend', (event) => {
        if (this.map._zoom > threshold && !active) {
          this.map.addLayer(parismap)
          active = true
        }

        if (this.map._zoom <= threshold && !active) {
          this.map.removeLayer(parismap)
          active = false
        }
      })
    })
  }

  //Function to Define Overlay Name
  overlayName(type, lang) {
    if (lang==="fra") {
      if (type==="hrr") {
        return "<b>Saint-Empire 1700</b>"
      }
      else if (type==="france") {
        return "<b>France 1700</b>"
      }
    }
    else if (lang==="de"){
      if (type==="hrr") {
        return "<b>HRR 1700</b>"
      }
      else if (type==="france") {
        return "<b>Frankreich 1700</b>"
      }
    }
  }

  //Function to Define Overlay Names
  overlayNames(lang) {
    if (lang==="fra") {
      var overlayMaps = {
        "Pitzler":"",
        "Harrach":"",
        "Corfey":"",
        "Knesebeck":"",
        "Sturm":"",
        "Neumann":"",
        "<b>Tous les voyageurs</b>":"",
        "<b>France 1700</b>":"",
        "<b>Saint-Empire 1700</b>":""
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
        "<b>Alle Reisende</b>":"",
        "<b>HRR 1700</b>":"",
        "<b>Frankreich 1700</b>":""
      }

      return overlayMaps
    }
  }
}

export {
  EuropeMap
}
