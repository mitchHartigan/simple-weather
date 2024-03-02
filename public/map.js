var mapOptions = {
  center: [33.4693663, -117.6577678],
  zoom: 8,
};

let forecast = {
  periods: [],
  polygon: [],
};

let polygon;

const testCoordinates = [
  [33.4822923, -117.6742156],
  [33.4600321, -117.6697109],
  [33.4637954, -117.6429692],
  [33.4860561, -117.6474688],
];

var map = new L.map("samplemap", mapOptions);
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);

map.addLayer(layer);

function addPolygon(coordinates) {
  polygon = L.polygon(coordinates, {
    color: "green",
    stroke: "true",
  }).addTo(map);
  map.fitBounds(polygon.getBounds());
}

function removePolygon() {
  polygon.remove();
  polygon = null;
}

addPolygon(testCoordinates);

function updateRegion(forecast) {
  const { polygonCoords } = forecast;
  removePolygon();
  addPolygon(polygonCoords);
}

map.addEventListener("click", async (evt) => {
  const { lat, lng } = evt.latlng;
  const response = await fetch(`/forecast/${lat},${lng}`);
  const forecast = await response.json();
  console.log(`forecast for ${lat}, ${lng}`, forecast);
  updateRegion(forecast);
});
