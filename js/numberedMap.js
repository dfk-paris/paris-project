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

    this.onEachFeatureNumbered = this.onEachFeatureNumbered.bind(this)
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
      "opacity": 0.65
    };

    var hrrStyle = {
      "color": "#860018",
      "weight": 1,
      "opacity": 0.65
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
      //Layer Group Cities for overlayMaps
      //Base Group
      var all = L.layerGroup([
        L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter: function(feature, layer) {
            return feature.properties.visitor=="All"
          }
        })
      ]).addTo(this.map)

      //Add Layer Group to overlayMaps
      overlayMaps[translation["baseLayer"][lang]] = all

      numberedPromise.then(data => {
        //Layer Group Cities for overlayMaps
        //Knesebeck Group
        var knesebeck = L.layerGroup([
          L.geoJSON(data, {
            onEachFeature: this.onEachFeatureNumbered,
            filter: function(feature, layer) {
              return feature.properties.visitor=="Knesebeck";
            }
          })
        ])

        //Corfey Group
        var corfey = L.layerGroup([
          L.geoJSON(data, {
            onEachFeature: this.onEachFeatureNumbered,
            filter: function(feature, layer) {
              return feature.properties.visitor=="Corfey";
            }
          })
        ])

        //Pitzler Group
        var pitzler = L.layerGroup([
          L.geoJSON(data, {
            onEachFeature: this.onEachFeatureNumbered,
            filter: function(feature, layer) {
              return feature.properties.visitor=="Pitzler";
            }
          })
        ])

        //Neumann Group
        var neumann = L.layerGroup([
          L.geoJSON(data, {
            onEachFeature: this.onEachFeatureNumbered,
            filter: function(feature, layer) {
              return feature.properties.visitor=="Neumann";
            }
          })
        ])

        //Harrach Group
        var harrach = L.layerGroup([
          L.geoJSON(data, {
            onEachFeature: this.onEachFeatureNumbered,
            filter: function(feature, layer) {
              return feature.properties.visitor=="Harrach";
            }
          })
        ])

        //Add Layer Group Travelogues to overlayMaps
        overlayMaps["Knesebeck"] = knesebeck
        overlayMaps["Corfey"] = corfey
        overlayMaps["Pitzler"] = pitzler
        overlayMaps["Neumann"] = neumann
        overlayMaps["Harrach"] = harrach
        // overlayMaps["Harrach"] = buildCluster(data, 'harrach', 'Harrach')
      })

      controlPromise.then(data => {
        //Layer Group Cities for overlayMaps
        //Knesebeck Group
        overlayMaps["Knesebeck"].addLayer(L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter:function(feature, layer) {
            return feature.properties.visitor=="Knesebeck"
          }
        }))

        overlayMaps["Corfey"].addLayer(L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter:function(feature, layer) {
            return feature.properties.visitor=="Corfey"
          }
        }))

        overlayMaps["Pitzler"].addLayer(L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter:function(feature, layer) {
            return feature.properties.visitor=="Pitzler"
          }
        }))

        overlayMaps["Neumann"].addLayer(L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter:function(feature, layer) {
            return feature.properties.visitor=="Neumann"
          }
        }))

        overlayMaps["Harrach"].addLayer(L.geoJSON(data, {
          onEachFeature: onEachFeature,
          filter:function(feature, layer) {
            return feature.properties.visitor=="Harrach"
          }
        }))

        //Update Layer Groups
        //overlayMaps["Knesebeck"] = knesebeck
        //overlayMaps["Corfey"] = corfey
        //overlayMaps["Pitzler"] = pitzler
        //overlayMaps["Neumann"] = neumann
        //overlayMaps["Harrach"] = harrach


        //Add layer control to map
        const control = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(this.map)
        this.hideHistoric(this.map, control, franceLabel, hreLabel, overlayMaps)
      })
    })

    const buildCluster = (data, id, name) => {
      // returns a function to render the marker cluster icons
      const iconCreateFunctionFor = (name) => {
        return (cluster) => {
          var childCount = cluster.getChildCount();

          let label = cluster.getAllChildMarkers().map(data => {
            // data burried in html string
            const l = data.feature.properties.label
            if (l) {
              const m = l.match(/(\d+)<\/text>[\s\n]*<\/svg>$/m)
              return m[1]
            } else {
              console.log(data)
              return 'x'
            }
          }).join(', ')

          var c = ' marker-cluster-';
          if (childCount < 10) {
            c += 'small';
          } else if (childCount < 100) {
            c += 'medium';
          } else {
            c += 'large';
          }

          c += ' marker-cluster-' + name

          return new L.DivIcon({ html: '<div><span>' + label + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
        }
      }

      var cluster = L.markerClusterGroup({
        iconCreateFunction: iconCreateFunctionFor(id),
        disableClusteringAtZoom: 16,
        maxClusterRadius: 1,
        polygonOptions: {
          color: colorMap[id] || 'gray'
        }
      })
      
      var opts = {
        onEachFeature: this.onEachFeatureNumbered,
        filter: function(feature, layer) {
          return feature.properties.visitor == name;
        }
      }

      L.geoJSON(data, opts).addTo(cluster)
      return cluster
    }
  }

  numberedMarker(svg) {
    var svgURL = "data:image/svg+xml;base64," + btoa(svg);
    return L.icon({
      iconUrl: svgURL,
      iconSize:     [20, 20], // size of the icon
      iconAnchor:   [18, 38], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })
  }

  //OnEachFeature Function
  onEachFeatureNumbered(feature, layer) {
    if (lang === "fra") {
      layer.setIcon(this.numberedMarker(feature.properties.label))
    } else if (lang === "de") {
      layer.setIcon(this.numberedMarker(feature.properties.label))
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
        "Pitzler":"",
        "Harrach":"",
        "Corfey":"",
        "Knesebeck":"",
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
  NumberedMap
}
