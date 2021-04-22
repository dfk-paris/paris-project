//Map for Paris Project
//Victor Westrich

import {
  BaseMap,
  baseUrl,
  buildLegend,
  colorMap,
  getColor,
  getIcon,
  lang,
  onEachFeature,
  setMarker,
  translation
} from './common.js'

class NumberedMap extends BaseMap{


  constructor(elementId) {
    super(elementId)

    this.boxes = null
    this.state = {
      overlays: {},
      mapping: {}
    }
    this.inputs = []
    // this.onEachFeatureNumbered = this.onEachFeatureNumbered.bind(this)
    this.updateNumbers = this.updateNumbers.bind(this)
    this.updateBoxes = this.updateBoxes.bind(this)
  }

  build() {
    //Map
    //Init Map
    this.map = L.map('mapid').setView([48.856667, 2.351667], 5)

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

    //Minimal
    //Carto DB No Labels
    var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
      subdomains: 'abcd',
      minZoom:6,
      maxZoom: 16
    }).addTo(this.map);


    //Traditional
    //Wikimedia
    var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>. Icons: <a href="https://thenounproject.com/">The Noun Project</a>',
      minZoom: 6,
      maxZoom: 16
    });

    //Layer Groups
    //Base Maps Container
    var baseMaps = {
      "Wikimedia" : Wikimedia,
      "Carto DB No Labels": CartoDB_PositronNoLabels
    };

    //Overlay Maps
    var overlayMaps = this.overlayNames(lang);

    //Overlay Name
    var franceLabel = this.overlayName("france", lang);
    var hreLabel = this.overlayName("hrr", lang);

    //France Polygon
    fetch(`${baseUrl}/geojson/france1700.geojson`)
      .then(response => response.json())
      .then(data => {
        var france = L.layerGroup([L.geoJSON(data, {style: franceStyle})]);
        overlayMaps[franceLabel] = france
      })

    //France Polygon
    fetch(`${baseUrl}/geojson/hrr1700.geojson`)
      .then(response => response.json())
      .then(data => {
        var hrr = L.layerGroup([L.geoJSON(data, {style: hrrStyle})]);
        overlayMaps[hreLabel] = hrr
      })

    //Fetch Data for Base Layer Icons
    const itineraryPromise = 
      fetch(`${baseUrl}/geojson/itinerary.geojson`)
      .then(response => response.json())

    //Fetch Data for Numbered Icons
    const numberedPromise = 
      fetch(`${baseUrl}/geojson/numberedFeatureCollection.geojson`)
      .then(response => response.json())

    //Fetch Data for Actual Icons
    const controlPromise = 
      fetch(`${baseUrl}/geojson/visitsEuropeGeolocated.geojson`)
      .then(response => response.json())
      
    itineraryPromise.then(data => {
      this.itinerary = data

      // the actual geographic icons (gray)
      var all = L.layerGroup([
        L.geoJSON(this.itinerary, {
          onEachFeature: onEachFeature,
          filter: function(feature, layer) {
            return feature.properties.visitor=="All"
          }
        })
      ]).addTo(this.map)

      //Add Layer Group to overlayMaps
      overlayMaps[translation["baseLayer"][lang]] = all

      numberedPromise.then(data => {
        this.numbers = data

        // group nums and visitors by coordinates
        for (const e of this.numbers.features) {
          const key = `${e.geometry.coordinates[0]}-${e.geometry.coordinates[1]}`

          this.state.mapping[key] = this.state.mapping[key] || []
          this.state.mapping[key].push({
            num: e.properties.labelNum,
            visitor: e.properties.visitor
          })
        }

        // we will also make sure that each coordinate pair is only shown once
        const found = {}
        this.numbers.features = this.numbers.features.filter(e => {
          const key = `${e.geometry.coordinates[0]}-${e.geometry.coordinates[1]}`
          
          if (found[key]) {
            return false
          } else {
            found[key] = true
            return true
          }
        })
      })

      controlPromise.then(data => {
        // so we can access it within callbacks
        const instance = this

        L.Control.NumberedMapControl = L.Control.Layers.extend({
          initialize: function(baseMaps, overlayMaps, options) {
            L.Control.Layers.prototype.initialize.call(this, baseMaps, overlayMaps, options)
          },
          onAdd: function(map) {
            const widget = L.Control.Layers.prototype.onAdd.call(this, map)

            // here, we add our own layer controls
            const original = widget.querySelector('.leaflet-control-layers-overlays')
            // if we don't wrap the inputs, they will be removed when the map is
            // updated by Control.Layers
            const checkboxes = document.createElement('div')
            original.before(checkboxes)

            for (const name of ['Pitzler', 'Harrach', 'Corfey', 'Knesebeck', 'Neumann']) {
              const input = document.createElement('input')
              input.setAttribute('type', 'checkbox')
              input.setAttribute('name', name)
              input.classList.add('leaflet-control-layers-selector')
              input.addEventListener('change', instance.updateNumbers)

              const span = document.createElement('span')
              span.append(' ' + name)

              const div = document.createElement('div')
              div.append(input, span)

              const label = document.createElement('label')
              label.append(div)

              instance.inputs.push(input)
              checkboxes.append(label)
            }

            return widget
          }
        })

        //Add layer control to map
        const control = new L.Control.NumberedMapControl(
          baseMaps,
          overlayMaps,
          {collapsed: false}
        ).addTo(this.map)
        this.hideHistoric(this.map, control, franceLabel, hreLabel, overlayMaps)
      })
    })
  }

  updateNumbers(event) {
    let hasActiveItineraries = false
    for (const input of this.inputs) {
      const name = input.getAttribute('name')
      const active = input.checked
      this.state.overlays[name] = active
      hasActiveItineraries = hasActiveItineraries || active
    }

    this.updateBoxes()
    this.ensureMarkers(hasActiveItineraries)
  }

  updateBoxes() {
    if (this.boxes) {
      this.map.removeLayer(this.boxes)
      this.boxes = null
    }

    // are any overlays active?
    const activeOverlays = Object.keys(this.state.overlays).filter((e) => this.state.overlays[e])
    if (activeOverlays.length == 0) {
      return
    }

    const instance = this

    this.boxes = L.geoJSON(this.numbers, {
      onEachFeature: function(feature, layer) {
        const key = `${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}`
        const r = instance.
          state.mapping[key].
          filter((e) => activeOverlays.includes(e.visitor)).
          sort((a, b) => {
            const visitors = ['Pitzler', 'Harrach', 'Corfey', 'Knesebeck', 'Neumann']
            const aVisitor = visitors.indexOf(a.visitor)
            const bVisitor = visitors.indexOf(b.visitor)

            return aVisitor - bVisitor
          })

        if (!r || !r.length) {
          const icon = L.divIcon({
            className: 'none-icon'
          })
          layer.setIcon(icon)
          return
        }



        const html = r.map(e => {
          return `<div visitor="${e.visitor}">${e.num}</div>`
        }).join('')

        const tileSize = 20
        const gutter = 5

        const iconSize = [
          Math.min(r.length, 3) * (tileSize + gutter) + gutter,
          Math.ceil(r.length / 3) * (tileSize + gutter) + gutter
        ]

        console.log(iconSize)

        const icon = L.divIcon({
          className: 'arch-itinerary-grid',
          html: html,
          iconSize: iconSize,
          iconAnchor: [
            iconSize[0] / 2 + 10,
            iconSize[1] + 25
          ]
        })
        layer.setIcon(icon)
      }
    })
    this.boxes.addTo(this.map)
  }

  ensureMarkers(hasActiveItineraries) {
    const input = this.map._container.
      querySelectorAll('.leaflet-control-layers-overlays input')[0]

    if (hasActiveItineraries) {
      if (!input.checked) {
        input.click()
      }
      input.setAttribute('disabled', 'true')
    } else {
      input.removeAttribute('disabled')
    }
  }

  //Function to Define Overlay Name
  overlayName(type, lang) {
    if (lang==="fra") {
      if (type==="hrr") {
        return "<b>Saint-Empire 1700</b>"
      } else if (type==="france") {
        return "<b>France 1700</b>"
      }
    } else if (lang==="de"){
      if (type==="hrr") {
        return "<b>HRR 1700</b>"
      } else if (type==="france") {
        return "<b>Frankreich 1700</b>"
      }
    }
  }

  //Function to Define Overlay Names
  overlayNames(lang) {
    if (lang==="fra") {
      var overlayMaps = {
        "<b>Tous les voyageurs</b>":"",
        "<b>France 1700</b>":"",
        "<b>Saint-Empire 1700</b>":""
      }

      return overlayMaps
    } else if (lang==="de"){
      var overlayMaps = {
        "<b>Alle Reisende</b>":"",
        "<b>HRR 1700</b>":"",
        "<b>Frankreich 1700</b>":""
      }

      return overlayMaps
    }
  }
}

export {
  NumberedMap
}
 {}