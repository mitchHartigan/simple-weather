import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Rectangle,
} from "react-leaflet";

import { Overview } from "./components/Overview";
import { testForecast } from "./testForecast";
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
  const [forecast, setForecast] = useState(testForecast);

  const Watchman = () => {
    const map = useMapEvents({
      async click(evt) {
        const { lat, lng } = evt.latlng;
        const forecast = await getForecast(lat, lng);
        const { coordinates } = forecast.geometry;
        setRegionBounds(coordinates);
        map.fitBounds(coordinates);
        setForecast(forecast);
        console.log("forecast", forecast);
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
      <Overview forecast={forecast} />
    </main>
  );
}

export default App;
