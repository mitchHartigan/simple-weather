import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { getForecast } from "./API";
import { useState } from "react";

const testBounds = [
  [33.4822923, -117.6742156],
  [33.4600321, -117.6697109],
  [33.4637954, -117.6429692],
  [33.4860561, -117.6474688],
];

function App() {
  const [regionBounds, setRegionBounds] = useState(testBounds);

  const Watchman = () => {
    const map = useMapEvents({
      async click(evt) {
        const { lat, lng } = evt.latlng;
        const forecast = await getForecast(lat, lng);
        console.log("forecast", forecast);
        setRegionBounds(forecast.geometry.coordinates);
      },
    });

    return null;
  };

  return (
    <main>
      <div style={{ width: "800px", height: "500px" }}>
        <MapContainer center={[33.4693663, -117.6577678]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Watchman />
          <FeatureGroup pathOptions={{ color: "green" }}>
            <Rectangle bounds={regionBounds} />
          </FeatureGroup>
        </MapContainer>
      </div>
    </main>
  );
}

export default App;
