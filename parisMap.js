//Map for Paris Project
//Victor Westrich

//Prerequisites
//Function Definitions
//OnEachFeature Function
function onEachFeature(feature, layer) {
    if (lang === "fra") {
        layer.bindPopup(feature.properties.description.fra);
        layer.setIcon(setMarker(feature.properties.type, feature.properties.color))
    }
    else if (lang === "de") {
        layer.bindPopup(feature.properties.description.de);
        layer.setIcon(setMarker(feature.properties.type, feature.properties.color))
    }
}

//Function for Language Variable (from URL Parameters)
function language() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var lang = urlParams.get("lang")
    if (lang === "de" || lang === "fra") {
    return lang
    }
    else {
        return "fra"
    }
}

//Set Language Variable
var lang = language()

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
                </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [17, 17], // size of the icon
                    iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
                });


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
                </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [17, 17], // size of the icon
                    iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
                });

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
            </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [17, 17], // size of the icon
                    iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
                });


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
            </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [17, 17], // size of the icon
                    iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
                });

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
    </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [17, 17], // size of the icon
                    iconAnchor:   [17, 17], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -17] // point from which the popup should open relative to the iconAnchor
                });

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
    </svg>`;

    var svgURL = "data:image/svg+xml;base64," + btoa(icon);

    return L.icon({
                    iconUrl: svgURL,

                    iconSize:     [13, 13], // size of the icon
                    iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -13] // point from which the popup should open relative to the iconAnchor
                });
    }

}


//Map
//Init Map
var map = L.map('mapid').setView([48.856667, 2.351667], 5);

//Traditional
//Wikimedia
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//Minimal
//Carto DB
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    minZoom: 15,
    maxZoom: 19
});

//Layer Groups
//Base Maps Container
var baseMaps = {
    "Stadia AlidadeSmooth": Stadia_AlidadeSmooth,
    "Carto DB" : CartoDB_Positron
};

//Overlay Maps Container
var overlayMaps = {
          "Sturm":"",
          "Knesebeck":"",
          "Corfey":"",
          "Pitzler":"",
          "Neumann":"",
          "Harrach":"",
          "<b>Paris 1778</b>":"" 
        };

//Image Overlay
var imageUrl = 'https://vwestric.github.io/paris-project/parisBW.png',
    imageBounds = [[48.8723,2.3163], [48.8364,2.3693]];
var imageOverlay = L.imageOverlay(imageUrl, imageBounds, opacity=0.7).addTo(map);
map.fitBounds(imageBounds);  
imageOverlay.setStyle({
      opacity: 0.7
    })
overlayMaps["<b>Paris 1778</b>"] = imageOverlay

//Legend
//Get Color For Legend
function getColor(d) {
return d === "Sturm" ? '#00cc00' :
d === "Knesebeck" ? '#ff0066' :
d === "Corfey" ? '#000099' :
d === "Pitzler" ? '#ffcc00' :
d === "Neumann" ? '#ff9900' :
d === "Harrach" ? '#ff0000' :
'black';
}

//Translation for Legend
var translation = {
    "legendLabel": {
        "fra": "Voyageurs",
        "de": "Reisende"
    },
    "symbolsLabel": {
        "fra": {
            "Symbols":"Symboles",
            "domestic":"édifices domestiques",
            "military":"constructions militaires",
            "religious":"édifices religieux",
            "infrastructure":"infrastructure",
            "public":"édifices publiques",
            "miscellaneous":"autres"

        },
        "de":{
            "Symbols":"Symbole",
            "domestic":"Wohngebäude",
            "military":"Militärische Gebäude",
            "religious":"Religöse Gebäude",
            "infrastructure":"Infrastruktur",
            "public":"Öffentliche Gebäude",
            "miscellaneous":"Sonstige"
        }
    }
}

//Get Icon For Legend
function getIcon(d) {
return d === "édifices domestiques" ? 'https://vwestric.github.io/paris-project/house.svg' :
d === "constructions militaires" ? 'https://vwestric.github.io/paris-project/military.svg' :
d === "édifices religieux" ? 'https://vwestric.github.io/paris-project/spiritual.svg' :
d === "infrastructure" ? 'https://vwestric.github.io/paris-project/bridge.svg' :
d === "édifices publiques" ? 'https://vwestric.github.io/paris-project/public.svg' :
d === "autres" ? 'https://vwestric.github.io/paris-project/circle.svg' :
d === "Wohngebäude" ? 'https://vwestric.github.io/paris-project/house.svg' :
d === "Militärische Gebäude" ? 'https://vwestric.github.io/paris-project/military.svg' :
d === "Religöse Gebäude" ? 'https://vwestric.github.io/paris-project/spiritual.svg' :
d === "Infrastruktur" ? 'https://vwestric.github.io/paris-project/bridge.svg' :
d === "Öffentliche Gebäude" ? 'https://vwestric.github.io/paris-project/public.svg' :
d === "Sonstige" ? 'https://vwestric.github.io/paris-project/circle.svg' :
'https://vwestric.github.io/paris-project/circle.svg';
}



var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    labels = ['<strong>'+ translation["legendLabel"][lang] +'</strong>'],
    symbols = ['<strong>'+ translation["symbolsLabel"][lang]["Symbols"]+'</strong>'],
    travelers = ["Pitzler","Harrach","Corfey","Knesebeck","Sturm","Neumann"];
    icons = [
             translation["symbolsLabel"][lang]["domestic"],
             translation["symbolsLabel"][lang]["military"],
             translation["symbolsLabel"][lang]["religious"],
             translation["symbolsLabel"][lang]["infrastructure"],
             translation["symbolsLabel"][lang]["public"],
             translation["symbolsLabel"][lang]["miscellaneous"],
             ]

    for (var i = 0; i < travelers.length; i++) {
    div.innerHTML += 
        labels.push(
            '<i style="background:' + getColor(travelers[i]) + '""></i> ' + travelers[i]);
    }

    for (var i = 0; i < icons.length; i++) {
    div.innerHTML += 
        symbols.push(
            '<img src="' + getIcon(icons[i]) + '" width=15 height=15> ' + icons[i]);
    }

    div.innerHTML = labels.join('<br>') + '<br>' + symbols.join('<br>');

    return div;
    };
    legend.addTo(map);

//Fetch Data
//In the actual Map, Data would be Fetched via this Request
fetch('https://vwestric.github.io/paris-project/visitsParisGeolocated.geojson')
  .then(response => response.json())
  .then(data => {

//Layer Group Cities for overlayMaps
//Sturm Group
var sturm = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Sturm";
    }})]);

//Knesebeck Group
var knesebeck = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Knesebeck";
    }})]);

//Corfey Group
var corfey = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Corfey";
    }})]);

//Pitzler Group
var pitzler = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Pitzler";
    }})]);

//Neumann Group
var neumann = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Neumann";
    }})]);

//Harrach Group
var harrach = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
        return feature.properties.visitor=="Harrach";
    }})]);

//Add Layer Group Travelogues to overlayMaps
overlayMaps["Sturm"] = sturm
overlayMaps["Knesebeck"] = knesebeck
overlayMaps["Corfey"] = corfey
overlayMaps["Pitzler"] = pitzler
overlayMaps["Neumann"] = neumann
overlayMaps["Harrach"] = harrach


//Add layer control to map
L.control.layers(baseMaps, overlayMaps).addTo(map);


});

