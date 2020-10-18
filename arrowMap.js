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
function getArrows(arrLatlngs, color, arrowCount, mapObj) {

    if (typeof arrLatlngs === undefined || arrLatlngs == null ||    
(!arrLatlngs.length) || arrLatlngs.length < 2)          
    return [];

    if (typeof arrowCount === 'undefined' || arrowCount == null)
        arrowCount = 1;

    if (typeof color === 'undefined' || color == null)
        color = '';
    else
        color = 'color:' + color;

    var result = [];
    for (var i = 1; i < arrLatlngs.length; i++) {
        var icon = L.divIcon({ className: 'arrow-icon', bgPos: [5, 5], html: '<div style="' + color + ';transform: rotate(' + getAngle(arrLatlngs[i - 1], arrLatlngs[i], -1).toString() + 'deg)">▶</div>' });
        for (var c = 1; c <= arrowCount; c++) {
            result.push(L.marker(myMidPoint(arrLatlngs[i], arrLatlngs[i - 1], (c / (arrowCount + 1)), mapObj), { icon: icon }));
        }
    }
    return result;
}

function getAngle(latLng1, latlng2, coef) {
    var dy = latlng2[0] - latLng1[0];
    var dx = Math.cos(Math.PI / 180 * latLng1[0]) * (latlng2[1] - latLng1[1]);
    var ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * coef);
    return (ang).toFixed(2);
}

function myMidPoint(latlng1, latlng2, per, mapObj) {
    if (!mapObj)
        throw new Error('map is not defined');

    var halfDist, segDist, dist, p1, p2, ratio,
        points = [];

    p1 = mapObj.project(new L.latLng(latlng1));
    p2 = mapObj.project(new L.latLng(latlng2));

    halfDist = distanceTo(p1, p2) * per;

    if (halfDist === 0)
        return mapObj.unproject(p1);

    dist = distanceTo(p1, p2);

    if (dist > halfDist) {
        ratio = (dist - halfDist) / dist;
        var res = mapObj.unproject(new Point(p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y)));
        return [res.lat, res.lng];
    }

}

function distanceTo(p1, p2) {
    var x = p2.x - p1.x,
        y = p2.y - p1.y;

    return Math.sqrt(x * x + y * y);
}

function toPoint(x, y, round) {
    if (x instanceof Point) {
        return x;
    }
    if (isArray(x)) {
        return new Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
        return x;
    }
    if (typeof x === 'object' && 'x' in x && 'y' in x) {
        return new Point(x.x, x.y);
    }
    return new Point(x, y, round);
}

function Point(x, y, round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
}

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
          "Sturm":"",
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
          "Sturm":"",
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
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// array of coordinates
var mylatlngs = [[
            53.67068019347264,
            12.480468749999998
          ],
          [
            53.409531853086435,
            10.634765625
          ],
          [
            52.84259457223949,
            7.9541015625
          ],
          [
            51.97134580885172,
            6.9873046875
          ],
          [
            51.01375465718821,
            6.0205078125
          ],
          [
            50.21909462044748,
            4.10888671875
          ],
          [
            49.49667452747045,
            2.96630859375
          ],
          [
            48.58932584966975,
            0.94482421875
          ],
          [
            47.70976154266637,
            1.318359375
          ],
          [
            45.920587344733654,
            2.6806640625
          ],
          [
            44.715513732021336,
            2.900390625
          ]
          ];

        var polyline = L.polyline(mylatlngs, { color: 'blue' }).addTo(map);
        // draw 5 arrows per line
        L.featureGroup(getArrows(mylatlngs, 'blue', 5,map)).addTo(map);

//Minimal
//Carto DB
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
        minZoom: 1,
    maxZoom: 19
});

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
fetch('https://vwestric.github.io/paris-project/france1700.geojson')
  .then(response => response.json())
  .then(data => {
    var france = L.layerGroup([L.geoJSON(data, {style: franceStyle})]);
    overlayMaps[franceLabel] = france

  });

//France Polygon
fetch('https://vwestric.github.io/paris-project/hrr1700.geojson')
  .then(response => response.json())
  .then(data => {
    var hrr = L.layerGroup([L.geoJSON(data, {style: hrrStyle})]);
    overlayMaps[hreLabel] = hrr

    //Add layer control to map
    L.control.layers(baseMaps, overlayMaps).addTo(map);

  });

// //Legend
// //Get Color For Legend
// function getColor(d) {
// return d === "Sturm" ? '#00cc00' :
// d === "Knesebeck" ? '#ff0066' :
// d === "Corfey" ? '#000099' :
// d === "Pitzler" ? '#ffcc00' :
// d === "Neumann" ? '#ff9900' :
// d === "Harrach" ? '#ff0000' :
// 'black';
// }

// //Get Icon For Legend
// function getIcon(d) {
// return d === "édifices domestiques" ? 'https://vwestric.github.io/paris-project/house.svg' :
// d === "constructions militaires" ? 'https://vwestric.github.io/paris-project/military.svg' :
// d === "édifices religieux" ? 'https://vwestric.github.io/paris-project/spiritual.svg' :
// d === "infrastructure" ? 'https://vwestric.github.io/paris-project/bridge.svg' :
// d === "édifices publiques" ? 'https://vwestric.github.io/paris-project/public.svg' :
// d === "autres" ? 'https://vwestric.github.io/paris-project/circle.svg' :
// d === "Wohngebäude" ? 'https://vwestric.github.io/paris-project/house.svg' :
// d === "Militärische Gebäude" ? 'https://vwestric.github.io/paris-project/military.svg' :
// d === "Religöse Gebäude" ? 'https://vwestric.github.io/paris-project/spiritual.svg' :
// d === "Infrastruktur" ? 'https://vwestric.github.io/paris-project/bridge.svg' :
// d === "Öffentliche Gebäude" ? 'https://vwestric.github.io/paris-project/public.svg' :
// d === "Sonstige" ? 'https://vwestric.github.io/paris-project/circle.svg' :
// 'https://vwestric.github.io/paris-project/circle.svg';
// }



// var legend = L.control({position: 'bottomleft'});
//     legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//     labels = ['<strong>'+ translation["legendLabel"][lang] +'</strong>'],
//     symbols = ['<strong>'+ translation["symbolsLabel"][lang]["Symbols"]+'</strong>'],
//     travelers = ["Pitzler","Harrach","Corfey","Knesebeck","Sturm","Neumann"];
//     icons = [
//              translation["symbolsLabel"][lang]["domestic"],
//              translation["symbolsLabel"][lang]["military"],
//              translation["symbolsLabel"][lang]["religious"],
//              translation["symbolsLabel"][lang]["infrastructure"],
//              translation["symbolsLabel"][lang]["public"],
//              translation["symbolsLabel"][lang]["miscellaneous"],
//              ]

//     for (var i = 0; i < travelers.length; i++) {
//     div.innerHTML += 
//         labels.push(
//             '<i style="background:' + getColor(travelers[i]) + '""></i> ' + travelers[i]);
//     }

//     for (var i = 0; i < icons.length; i++) {
//     div.innerHTML += 
//         symbols.push(
//             '<img src="' + getIcon(icons[i]) + '" width=17 height=17> ' + icons[i]);
//     }

//     div.innerHTML = labels.join('<br>') + '<br>' + symbols.join('<br>');

//     return div;
//     };
//     legend.addTo(map);



//Fetch Data
//In the actual Map, Data would be Fetched via this Request
// fetch('https://vwestric.github.io/paris-project/visitsEuropeGeolocated.geojson')
//   .then(response => response.json())
//   .then(data => {

// //Layer Group Cities for overlayMaps
// //Sturm Group
// var sturm = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Sturm";
//     }})]);

// //Knesebeck Group
// var knesebeck = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Knesebeck";
//     }})]);

// //Corfey Group
// var corfey = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Corfey";
//     }})]);

// //Pitzler Group
// var pitzler = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Pitzler";
//     }})]);

// //Neumann Group
// var neumann = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Neumann";
//     }})]);

// //Harrach Group
// var harrach = L.layerGroup([L.geoJSON(data, {onEachFeature: onEachFeature, filter:function(feature, layer) {
//         return feature.properties.visitor=="Harrach";
//     }})]);

// //Add Layer Group Travelogues to overlayMaps
// overlayMaps["Sturm"] = sturm
// overlayMaps["Knesebeck"] = knesebeck
// overlayMaps["Corfey"] = corfey
// overlayMaps["Pitzler"] = pitzler
// overlayMaps["Neumann"] = neumann
// overlayMaps["Harrach"] = harrach





// });

