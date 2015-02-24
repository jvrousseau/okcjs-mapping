L.mapbox.accessToken = "pk.eyJ1IjoianZyb3Vzc2VhdSIsImEiOiJYYUNlcVRZIn0.lp0867Jn5ynlj72kMwICSA";

var bbox = [-155, 10, -45, 80];

var map = L.mapbox.map('map', 'jvrousseau.map-bzxtnr7p', {
  zoomControl: false
}).setView([37, -95, ], 4);

var layerGroup = L.layerGroup().addTo(map);

var grid = turf.hex(bbox, 1.0);
var grid = turf.count(grid, currentObs, 'pt_count');
var grid = turf.average(grid, currentObs, 'temp_c', 'temperature');

max = 0;

grid.features.forEach(function(cell) {
  var pt_count = cell.properties.pt_count;
  var color = pt_count === 0 ? '#000000' : getColor(cell.properties.temperature);
  cell.properties.color = color;
  cell.properties.weight = 0.5;
  cell.properties.fill = color;
  cell.properties.stroke = pt_count > 0;
  cell.properties.fillOpacity = pt_count > 0 ? ((pt_count / 100) + 0.2) : 0;
});

L.geoJson(currentObs, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 0.5,
      fillColor: '#d2d2d2',
      fillOpacity: 0.05,
      stroke: false
    });
  }
}).addTo(layerGroup);

var hex = L.geoJson(grid)
  .eachLayer(function(l) {
    l.setStyle(l.feature.properties);
  }).addTo(layerGroup);

function getColor(temp) {
  var color = "#FF00FF";
  temp = temp * 1.8000 + 60;
  gradient.some(function(value, index, array) {
    if (temp >= value.temp) {
      color = value.hex;
      return true;
    }
  });
  return color;
}
