//Map for Paris Project
//Victor Westrich

//Prerequisites
//Language Dictionary
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
    },
    "overlayLabel":{
        "fra": {
            "hre": "<b>Saint-Empire 1700</b>",
        "france": "<b>France 1700</b>"
        },
        "de": {
            "hre": "<b>HRR 1700</b>",
        "france": "<b>Frankreich 1700</b>"
        }
    }
}
//Function Definitions

//OnEachFeature Function
function onEachFeature(feature, layer) {
    if (lang === "fra") {
        layer.bindPopup(feature.properties.visitor);
    }
    else if (lang === "de") {
        layer.bindPopup(feature.properties.visitor);
    }
}

//Function to Define Overlay Name
function overlayName(type, lang) {
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

//Function to Define Overlay Name
function overlayNames(lang) {
    if (lang==="fra") {
        var overlayMaps = {
          "Knesebeck":"",
          "Corfey":"",
          "Pitzler":"",
          "Neumann":"",
          "Harrach":"",
          "<b>France 1700</b>":"",
          "<b>Saint-Empire 1700</b>":""    
        };
        return overlayMaps
    }
    else if (lang==="de"){
        var overlayMaps = {
          "Knesebeck":"",
          "Corfey":"",
          "Pitzler":"",
          "Neumann":"",
          "Harrach":"",
          "<b>HRR 1700</b>":"",
          "<b>Frankreich 1700</b>":""    
        };
        return overlayMaps
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


//Map
//Init Map
var map = L.map('mapid').setView([48.856667, 2.351667], 5);

//Traditional
//Wikimedia
var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
  attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
  minZoom: 1,
  maxZoom: 19
});

//Minimal
//Carto DB
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
        minZoom: 1,
    maxZoom: 19
}).addTo(map);

//Overlay Name
var franceLabel = overlayName("france", lang);
var hreLabel = overlayName("hrr", lang);

//Layer Groups
//Base Maps
var baseMaps = {
    "Wikimedia": Wikimedia,
    "Carto DB" : CartoDB_Positron
};

//Overlay Maps
var overlayMaps = overlayNames(lang);


//France Polygon
fetch('https://vwestric.github.io/paris-project/geojson/france1700.geojson')
  .then(response => response.json())
  .then(data => {
    var france = L.layerGroup([L.geoJSON(data, {style: franceStyle})]);
    overlayMaps[franceLabel] = france

  });

//France Polygon
fetch('https://vwestric.github.io/paris-project/geojson/hrr1700.geojson')
  .then(response => response.json())
  .then(data => {
    var hrr = L.layerGroup([L.geoJSON(data, {style: hrrStyle})]);
    overlayMaps[hreLabel] = hrr

  });


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

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    labels = ['<strong>'+ translation["legendLabel"][lang] +'</strong>'],
    symbols = ['<strong>'+ translation["symbolsLabel"][lang]["Symbols"]+'</strong>'],
    travelers = ["Pitzler","Harrach","Corfey","Knesebeck","Neumann"];

    for (var i = 0; i < travelers.length; i++) {
    div.innerHTML += 
        labels.push(
            '<i style="background:' + getColor(travelers[i]) + '""></i> ' + travelers[i]);
    }

    div.innerHTML = labels.join('<br>');

    return div;
    };
    legend.addTo(map);

//Fetch Data
//In the actual Map, Data would be Fetched via this Request
fetch('https://vwestric.github.io/paris-project/geojson/featureCollectionLineStrings.geojson')
  .then(response => response.json())
  .then(data => {

//Layer Group Cities for overlayMaps
//Knesebeck Group
var knesebeck = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, style:{"color":"#ff0066"}, filter:function(feature, layer) {
        return feature.properties.visitor=="Knesebeck";
    }})]);

//Corfey Group
var corfey = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, style:{"color":"#000099"}, filter:function(feature, layer) {
        return feature.properties.visitor=="Corfey";
    }})]);

//Pitzler Group
var pitzler = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, style:{"color":"#ffcc00"}, filter:function(feature, layer) {
        return feature.properties.visitor=="Pitzler";
    }})]);

//Neumann Group
var neumann = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, style:{"color":"#ff9900"}, filter:function(feature, layer) {
        return feature.properties.visitor=="Neumann";
    }})]);

//Harrach Group
var harrach = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, style:{"color":"#ff0000"}, filter:function(feature, layer) {
        return feature.properties.visitor=="Harrach";
    }})]);

//Add Layer Group Travelogues to overlayMaps
overlayMaps["Knesebeck"] = knesebeck
overlayMaps["Corfey"] = corfey
overlayMaps["Pitzler"] = pitzler
overlayMaps["Neumann"] = neumann
overlayMaps["Harrach"] = harrach


//Add layer control to map
L.control.layers(baseMaps, overlayMaps).addTo(map);


});

