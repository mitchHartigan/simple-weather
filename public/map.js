var mapOptions = {
  center: [44.1513873240218, -482.32143402099615],
  zoom: 8,
};

var map = new L.map("samplemap", mapOptions);
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);

map.addLayer(layer);
map.addEventListener("click", (evt) => {});
