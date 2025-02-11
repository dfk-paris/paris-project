class BaseMap {
  constructor(elementId) {
    this.elementId = elementId
  }

  destroy() {
    this.map.remove()
  }

  // Remove historic contours on higher zoom levels. We can set this up only once
  // both maps have been loaded
  hideHistoric(map, control, franceLabel, hreLabel, overlayMaps) {
    const threshold = 7
    let active = true
    let layers = {
      [franceLabel]: overlayMaps[franceLabel],
      [hreLabel]: overlayMaps[hreLabel]
    }
    let selected = {
      [franceLabel]: false,
      [hreLabel]: false
    }

    map.on('zoomend', (event) => {
      if (map._zoom >= threshold && active) {
        for (const label of [franceLabel, hreLabel]) {
          selected[label] = map.hasLayer(layers[label])
          control.removeLayer(layers[label])
          map.removeLayer(layers[label])
          active = false
        }
      }

      if (map._zoom < threshold && !active) {
        for (const label of [franceLabel, hreLabel]) {
          control.addOverlay(layers[label], label)
          if (selected[label]) {map.addLayer(layers[label])}
          active = true
        }
      }
    })
  }
}

let baseUrl = 'http://localhost:4000/paris-project'
let synopticUrl = 'https://architrave.eu/view.html'

if (document.location.href.match(/localhost:3001/)) {
  baseUrl = '/exist/apps/sade-architrave/templates/itinerary'
  synopticUrl = '/exist/apps/sade-architrave/view.html'
}

if (document.location.href.match(/architrave.eu\/dev/)) {
  baseUrl = '/dev/templates/itinerary'
  synopticUrl = 'https://architrave.eu/dev/view.html'
} else {
  if (document.location.href.match(/architrave.eu/)) {
    baseUrl = '/templates/itinerary'
  }
}


//Language Dictionary
//Translation for Legend
const translation = {
  "legendLabel": {
    "fra": "Voyageurs",
    "de": "Reisende"
  },
  "symbolsLabel": {
    "fra": {
      "Symbols":"Symboles",
      "public":"Édifices publics",
      "religious":"Édifices religieux",
      "domestic":"Édifices domestiques",
      "monuments":"Monuments",
      "infrastructure":"Infrastructures",
      "military":"Constructions militaires",
      "garden":"Parcs et jardins",
      "geographic":"Lieux géographiques",
      "miscellaneous":"Autres lieux"
    },
    "de": {
      "Symbols":"Symbole",
      "public":"Öffentliche Gebäude",
      "religious":"Religiöse Gebäude",
      "domestic":"Wohngebäude",
      "monuments":"Monumente",
      "infrastructure":"Infrastruktur",
      "military":"Militäreinrichtungen",
      "garden":"Parks und Gärten",
      "geographic":"Geographische Orte",
      "miscellaneous":"Andere Orte"
    }
  },
  "baseLayer": {
    "fra": "<b>Tous les voyageurs</b>",
    "de": "<b>Alle Reisende</b>"
  },
  "overlayLabel": {
    "fra": {
      "hre": "<b>Saint-Empire 1700</b>",
      "france": "<b>France 1700</b>"
    },
    "de": {
      "hre": "<b>HRR 1700</b>",
      "france": "<b>Frankreich 1700</b>"
    }
  },
}

//Marker Function
function setMarker(type, color) {
  if (type=="domestic") {
    var icon = `
    <svg xmlns="http://www.w3.org/2000/svg"
     width="246.914mm" height="246.914mm"
     viewBox="0 0 700 700">
    <path id="House"
        fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="25"
        d="M 108.00,313.00
           C 108.00,313.00 108.00,539.00 108.00,539.00
             108.03,559.04 117.81,572.97 139.00,573.00
             139.00,573.00 266.00,573.00 266.00,573.00
             282.60,572.97 290.97,563.23 291.00,547.00
             291.00,547.00 291.00,429.00 291.00,429.00
             291.03,411.42 300.00,401.03 318.00,401.00
             318.00,401.00 381.00,401.00 381.00,401.00
             399.89,401.03 407.97,413.28 408.00,431.00
             408.00,431.00 408.00,548.00 408.00,548.00
             408.03,564.06 416.98,572.98 433.00,573.00
             433.00,573.00 560.00,573.00 560.00,573.00
             564.49,572.99 566.62,573.10 571.00,571.64
             582.90,567.67 589.85,557.34 590.00,545.00
             590.00,545.00 590.00,534.00 590.00,534.00
             590.00,534.00 590.00,513.00 590.00,513.00
             590.00,513.00 590.00,313.00 590.00,313.00
             594.39,317.04 601.54,324.00 607.00,325.89
             621.58,330.96 637.81,321.97 638.90,306.00
             639.78,293.28 630.75,286.17 622.00,278.58
             622.00,278.58 611.00,268.17 611.00,268.17
             611.00,268.17 587.00,246.00 587.00,246.00
             587.00,246.00 534.00,196.91 534.00,196.91
             534.00,196.91 455.00,123.09 455.00,123.09
             455.00,123.09 416.00,87.00 416.00,87.00
             416.00,87.00 391.00,63.91 391.00,63.91
             391.00,63.91 367.00,41.42 367.00,41.42
             363.52,38.40 353.90,27.86 350.00,27.86
             346.24,27.86 335.48,39.21 332.00,42.28
             332.00,42.28 309.00,63.91 309.00,63.91
             309.00,63.91 281.00,89.96 281.00,89.96
             281.00,89.96 231.00,136.09 231.00,136.09
             231.00,136.09 124.00,235.91 124.00,235.91
             124.00,235.91 81.00,275.91 81.00,275.91
             75.30,281.22 65.33,288.76 62.56,296.00
             57.06,310.42 66.12,326.26 82.00,326.96
             94.49,327.51 99.82,321.18 108.00,313.00 Z" />
            </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

} else if (type=="monuments") {
     var icon = `<svg xmlns="http://www.w3.org/2000/svg"
        width="37.5562mm" height="17.7202mm"
       viewBox="0 0 142 67">
      <path id="monuments"
          fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="7"
          d="M M560 448h-16V96H32v352H16.02 c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16H176c8.84 0 16-7.16 16-16V320c0-53.02 42.98-96 96-96s96 42.98 96 96l.02 160v16c0 8.84 7.16 16 16 16H560c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm0-448H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h544c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16z  Z" />
      </svg>`

   var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
    iconUrl: svgURL,
     iconSize:     [17, 17], // size of the icon
     iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
     popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
   })

  } else if (type=="military") {
    var icon = `
     <svg xmlns="http://www.w3.org/2000/svg"
     width="38.0852mm" height="31.2087mm"
     viewBox="0 0 144 118">
      <path id="Military"
        fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="7"
        d="M 22.00,67.00
           C 19.02,65.24 16.95,64.03 15.09,60.96
             13.45,58.27 13.53,55.27 10.72,53.65
             9.45,52.92 6.51,52.27 5.04,52.22
             -2.00,52.02 0.70,61.01 2.35,65.00
             5.69,73.11 13.23,79.17 21.98,80.52
             28.31,81.49 27.96,77.13 31.63,72.00
             33.88,68.87 37.86,65.03 41.00,62.79
             59.76,49.36 84.02,58.90 93.00,79.00
             102.36,75.89 120.06,59.67 128.91,55.25
             133.55,52.93 138.24,58.55 142.11,52.77
             144.74,48.84 141.56,43.64 139.75,40.00
             139.75,40.00 125.75,11.00 125.75,11.00
             124.03,7.56 121.83,1.96 117.96,0.62
             111.40,-1.65 110.50,5.89 107.69,8.16
             105.32,10.07 96.37,12.29 93.00,13.34
             93.00,13.34 60.00,23.28 60.00,23.28
             44.28,28.00 31.06,30.98 24.26,48.00
             21.47,54.97 22.00,59.75 22.00,67.00 Z
           M 58.00,65.48
           C 48.73,67.06 41.71,70.32 37.04,79.00
             27.94,95.94 39.43,117.51 59.00,117.99
             64.09,118.11 67.31,117.90 72.00,115.67
             97.30,103.65 88.59,63.73 58.00,65.48 Z
           M 58.00,78.34
           C 61.14,78.06 63.05,77.96 66.00,79.45
             80.25,86.67 73.60,107.20 59.00,105.44
             44.47,103.70 41.60,82.75 58.00,78.34 Z
           M 58.31,88.07
           C 53.72,92.88 57.90,97.58 61.86,95.72
             66.13,93.71 65.64,86.13 58.31,88.07 Z" />
            </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else if (type=="religious") {
    var icon = `
      <svg xmlns="http://www.w3.org/2000/svg"
      width="32.8042mm" height="32.8042mm"
      viewBox="0 0 124 124">
      <path id="Spiritual"
      fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="7"
      d="M 59.00,0.00
         C 59.00,0.00 59.00,8.00 59.00,8.00
           59.00,8.00 51.00,8.00 51.00,8.00
           51.00,8.00 51.00,15.00 51.00,15.00
           53.10,14.70 55.64,14.01 57.40,15.64
           60.04,18.08 59.54,29.91 57.40,32.62
           55.73,34.74 47.72,39.32 45.00,41.05
           45.00,41.05 14.00,61.00 14.00,61.00
           14.00,61.00 17.00,66.00 17.00,66.00
           17.00,66.00 31.00,59.00 31.00,59.00
           30.97,61.52 31.14,64.55 29.83,66.79
           27.88,70.12 14.04,77.61 10.00,79.99
           3.59,83.75 0.15,83.97 0.00,92.00
           0.00,92.00 0.00,124.00 0.00,124.00
           0.00,124.00 124.00,124.00 124.00,124.00
           124.00,124.00 124.00,93.00 124.00,93.00
           124.00,93.00 122.40,85.53 122.40,85.53
           122.40,85.53 101.00,72.20 101.00,72.20
           101.00,72.20 94.02,66.79 94.02,66.79
           94.02,66.79 93.00,59.00 93.00,59.00
           93.00,59.00 107.00,66.00 107.00,66.00
           107.00,66.00 110.00,62.00 110.00,62.00
           105.40,56.59 85.22,44.94 78.00,40.42
           71.14,36.13 65.17,34.83 65.00,26.00
           64.87,18.46 63.81,13.67 73.00,15.00
           73.00,15.00 73.00,8.00 73.00,8.00
           73.00,8.00 65.00,8.00 65.00,8.00
           65.00,8.00 65.00,0.00 65.00,0.00
           65.00,0.00 59.00,0.00 59.00,0.00 Z
         M 66.00,117.00
         C 66.00,117.00 58.00,117.00 58.00,117.00
           58.00,117.00 58.00,97.00 58.00,97.00
           58.02,94.14 57.80,88.63 62.00,88.63
           66.49,88.63 65.99,95.03 66.00,98.00
           66.00,98.00 66.00,117.00 66.00,117.00 Z" />
          </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else if (type=="public") {
    var icon = `<svg xmlns="http://www.w3.org/2000/svg"
       width="26.1905mm" height="26.448mm"
       viewBox="0 0 99 100">
      <path id="Public"
      fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="5"
      d="M 1.00,29.00
         C 5.87,30.93 24.62,30.00 31.00,30.00
           31.00,30.00 98.00,30.00 98.00,30.00
           98.00,30.00 66.00,9.58 66.00,9.58
           63.16,7.81 53.53,1.38 51.00,0.80
           46.77,-0.15 39.62,5.40 36.00,7.68
           36.00,7.68 1.00,29.00 1.00,29.00 Z
         M 5.00,37.00
         C 5.00,37.00 6.00,51.00 6.00,51.00
           6.00,51.00 6.00,81.00 6.00,81.00
           6.00,81.00 17.00,81.00 17.00,81.00
           17.00,81.00 17.00,51.00 17.00,51.00
           17.00,51.00 18.00,37.00 18.00,37.00
           18.00,37.00 5.00,37.00 5.00,37.00 Z
         M 30.00,37.00
         C 30.00,37.00 31.00,51.00 31.00,51.00
           31.00,51.00 31.00,81.00 31.00,81.00
           31.00,81.00 43.00,81.00 43.00,81.00
           43.00,81.00 43.00,37.00 43.00,37.00
           43.00,37.00 30.00,37.00 30.00,37.00 Z
         M 56.00,37.00
         C 56.00,37.00 56.00,81.00 56.00,81.00
           56.00,81.00 68.00,81.00 68.00,81.00
           68.00,81.00 68.00,37.00 68.00,37.00
           68.00,37.00 56.00,37.00 56.00,37.00 Z
         M 81.00,37.00
         C 81.00,37.00 82.00,52.00 82.00,52.00
           82.00,52.00 82.00,81.00 82.00,81.00
           82.00,81.00 93.00,81.00 93.00,81.00
           93.00,81.00 93.00,50.00 93.00,50.00
           93.00,50.00 94.00,37.00 94.00,37.00
           94.00,37.00 81.00,37.00 81.00,37.00 Z
         M 2.00,88.00
         C 2.00,88.00 0.00,100.00 0.00,100.00
           0.00,100.00 99.00,100.00 99.00,100.00
           99.00,100.00 97.00,88.00 97.00,88.00
           97.00,88.00 2.00,88.00 2.00,88.00 Z" />
          </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else if (type=="infrastructure") {
    var icon = `<svg xmlns="http://www.w3.org/2000/svg"
       width="37.5562mm" height="17.7202mm"
       viewBox="0 0 142 67">
      <path id="Infrastructure"
          fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="7"
          d="M 0.00,1.00
             C 0.00,1.00 0.00,67.00 0.00,67.00
               0.00,67.00 20.00,67.00 20.00,67.00
               20.00,57.40 18.48,46.32 23.97,38.01
               32.83,24.60 52.27,26.60 59.08,41.00
               61.99,47.15 61.00,59.87 61.00,67.00
               61.00,67.00 81.00,67.00 81.00,67.00
               81.00,59.87 80.01,47.15 82.92,41.00
               89.73,26.60 109.17,24.60 118.03,38.01
               123.52,46.32 122.00,57.40 122.00,67.00
               122.00,67.00 142.00,67.00 142.00,67.00
               142.00,67.00 142.00,1.00 142.00,1.00
               142.00,1.00 128.00,0.03 128.00,0.03
               128.00,0.03 114.00,1.00 114.00,1.00
               114.00,1.00 85.00,1.00 85.00,1.00
               85.00,1.00 71.00,0.03 71.00,0.03
               71.00,0.03 57.00,1.00 57.00,1.00
               57.00,1.00 27.00,1.00 27.00,1.00
               27.00,1.00 14.00,0.03 14.00,0.03
               14.00,0.03 0.00,1.00 0.00,1.00 Z" />
      </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else if (type=="geographic") {
    var icon = `<svg xmlns="http://www.w3.org/2000/svg"
       width="37.5562mm" height="17.7202mm"
       viewBox="0 0 365 560">
      <path id="Geographic"
          fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="17"
          d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9
         C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8
             c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
      </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else if (type=="garden") {
    var icon = `<svg xmlns="http://www.w3.org/2000/svg"
      width="44.1682mm" height="68.5185mm"
      viewBox="0 0 167 259">
        <path id="Garden"
          fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="7"
          d="M 72.00,259.00
             C 72.00,259.00 98.00,259.00 98.00,259.00
               98.00,259.00 98.00,162.00 98.00,162.00
               107.98,161.18 119.39,157.03 128.00,151.99
               150.85,138.61 166.68,113.80 167.00,87.00
               167.18,70.92 166.38,58.80 159.03,44.00
               145.79,17.35 117.75,0.05 88.00,0.00
               88.00,0.00 79.00,0.00 79.00,0.00
               55.01,0.04 30.63,11.85 16.13,31.00
               6.55,43.66 0.19,60.01 0.00,76.00
               0.00,76.00 0.00,85.00 0.00,85.00
               0.04,108.79 11.26,131.36 30.00,145.98
               38.36,152.51 46.01,156.10 56.00,159.33
               59.06,160.32 68.85,162.02 70.40,163.59
               72.33,165.56 71.99,169.43 72.00,172.00
               72.00,172.00 72.00,259.00 72.00,259.00 Z" />
      </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
      iconUrl: svgURL,
      iconSize:     [17, 17], // size of the icon
      iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
    })

  } else {
    var icon = `<svg xmlns="http://www.w3.org/2000/svg"
      width="25.6614mm" height="25.9841mm"
      viewBox="0 0 286 291">
      <path id="Circle"
          fill="${color}" fill-opacity="0.8" stroke="black" stroke-width="15"
          d="M 141.00,0.86
             C 141.00,0.86 128.00,0.86 128.00,0.86
               119.45,1.99 109.23,4.24 101.00,6.72
               66.55,17.10 37.18,41.99 19.43,73.00
               -25.51,151.50 12.58,256.27 100.00,283.97
               118.46,289.82 138.78,291.67 158.00,289.83
               174.67,288.24 192.10,282.80 207.00,275.24
               221.99,267.65 236.58,256.46 247.83,244.00
               301.30,184.80 297.50,90.91 238.00,37.17
               225.20,25.61 210.99,16.80 195.00,10.40
               179.50,4.20 166.58,1.68 150.00,0.86
               150.00,0.86 141.00,0.86 141.00,0.86 Z" />
      </svg>`

    var svgURL = "data:image/svg+xml;base64," + btoa(icon)

    return L.icon({
        iconUrl: svgURL,
        iconSize:     [13, 13], // size of the icon
        iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -13] // point from which the popup should open relative to the iconAnchor
    })
  }
}

//Legend
//Get Color For Legend
function getColor(d) {
  return d === "Sturm" ? '#00cc00' :
  d === "Knesebeck" ? '#ff0066' :
  d === "Corfey" ? '#6699FF' :
  d === "Pitzler" ? '#ffcc00' :
  d === "Neumann" ? '#cc6600' :
  d === "Harrach" ? '#ff0000' :
  'black'
}

function iconFor(category) {
  return {
    "public": `${baseUrl}/svg/public.svg`,
    "religious": `${baseUrl}/svg/spiritual.svg`,
    "domestic": `${baseUrl}/svg/house.svg`,
    "monuments": `${baseUrl}/svg/monuments.svg`,
    "infrastructure": `${baseUrl}/svg/bridge.svg`,
    "military": `${baseUrl}/svg/military.svg`,
    "garden": `${baseUrl}/svg/garden.svg`,
    "geographic": `${baseUrl}/svg/marker.svg`,
    "miscellaneous": `${baseUrl}/svg/circle.svg`
  }[category] || `${baseUrl}/svg/circle.svg`
}

const colorMap = {
  corfey: 'rgba(102, 153, 255, 0.4)',
  knesebeck: 'rgba(254, 49, 130, 0.4)',
  neumann: 'rgba(204, 102, 0, 0.4)',
  harrach: 'rgba(253, 23, 0, 0.4)',
  pitzler: 'rgba(241, 211, 87, 0.6)',
  sturm: 'rgba(176, 176, 176, 0.6)'
}

//Function for Language Variable (from URL Parameters)
function language() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var lang = urlParams.get("lang")
  if (lang === "de" || lang === "fra") {
    return lang
  } else {
    return "fra"
  }
}

function buildLegend() {
  let legend = L.control({position: 'bottomleft'})
  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
    labels = ['<strong>'+ translation["legendLabel"][lang] +'</strong>'],
    symbols = ['<strong>'+ translation["symbolsLabel"][lang]["Symbols"]+'</strong>'],
    travelers = ["Pitzler","Harrach","Corfey","Knesebeck","Sturm","Neumann"];
    const categories = [
      "public",
      "religious",
      "domestic",
      "monuments",
      "infrastructure",
      "military",
      "garden",
      "geographic",
      "miscellaneous"
    ]

    for (let i = 0; i < travelers.length; i++) {
      div.innerHTML +=
        labels.push(
          '<i style="background:' + getColor(travelers[i]) + '""></i> ' + travelers[i]
        )
    }

    for (const c of categories) {
      const label = translation["symbolsLabel"][lang][c]

      div.innerHTML +=
        symbols.push(
          `<img
            src="${iconFor(c)}"
            width="15"
            height="15"
          /> ${label}`
        )
    }

    div.innerHTML = labels.join('<br>') + '<br>' + symbols.join('<br>')

    return div
  }

  return legend
}

//Function Definitions
//OnEachFeature Function
function onEachFeature(feature, layer) {
  if (lang === "fra") {
    layer.on('click', function() { openPlaceName('plc:'+feature.properties.id) });
    layer.setIcon(setMarker(feature.properties.type, feature.properties.color))
  } else if (lang === "de") {
    layer.on('click', function() { openPlaceName('plc:'+feature.properties.id) });
    layer.setIcon(setMarker(feature.properties.type, feature.properties.color))
  }
}

function buildControl(map, baseMaps, overlayMaps, data) {
  // returns a function to render the marker cluster icons
  const iconCreateFunctionFor = (name) => {
    return (cluster) => {
      var childCount = cluster.getChildCount();

      var c = ' marker-cluster-';
      if (childCount < 10) {
        c += 'small';
      } else if (childCount < 100) {
        c += 'medium';
      } else {
        c += 'large';
      }

      c += ' marker-cluster-' + name

      return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
    }
  }

  // builds a marker cluster by filtering the data and setting options
  const buildCluster = (data, id, name) => {
    var cluster = L.markerClusterGroup({
      iconCreateFunction: iconCreateFunctionFor(id),
      disableClusteringAtZoom: 16,
      polygonOptions: {
        color: colorMap[id] || 'gray'
      }
    })
    var opts = {
      onEachFeature: onEachFeature,
      filter: function(feature, layer) {
        return feature.properties.visitor == name;
      }
    }
    L.geoJSON(data, opts).addTo(cluster)
    return cluster
  }

  //Add Marker Cluster (Layer Group) Travelogues to overlayMaps
  const all = buildCluster(data, 'all', 'All')
  overlayMaps[translation["baseLayer"][lang]] = all
  all.addTo(map)

  overlayMaps["Pitzler"] = buildCluster(data, 'pitzler', 'Pitzler')
  overlayMaps["Harrach"] = buildCluster(data, 'harrach', 'Harrach')
  overlayMaps["Corfey"] = buildCluster(data, 'corfey', 'Corfey')
  overlayMaps["Knesebeck"] = buildCluster(data, 'knesebeck', 'Knesebeck')
  overlayMaps["Sturm"] = buildCluster(data, 'sturm', 'Sturm')
  overlayMaps["Neumann"] = buildCluster(data, 'neumann', 'Neumann')

  //Add layer control to map
  const control = L.control.layers(baseMaps, overlayMaps, {collapsed: false})
  control.addTo(map)

  return control
}

const lang = language()

export {
  BaseMap,
  baseUrl,
  buildControl,
  buildLegend,
  colorMap,
  getColor,
  lang,
  onEachFeature,
  translation,
  setMarker,
  synopticUrl
}
