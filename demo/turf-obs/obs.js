L.mapbox.accessToken = "pk.eyJ1IjoianZyb3Vzc2VhdSIsImEiOiJYYUNlcVRZIn0.lp0867Jn5ynlj72kMwICSA";
var map = L.mapbox.map('map', 'jvrousseau.map-bzxtnr7p', {
  zoomControl: false
}).setView([37, -95, ], 4);

var global_obs = new L.layerGroup().addTo(map);

L.geoJson(currentObs, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 2,
      fillColor: getColor(parseFloat(feature.properties.temp_c)),
      fillOpacity: 0.35,
      stroke: false
    });
  }
}).addTo(global_obs);

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
