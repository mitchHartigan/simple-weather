import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

function App() {
  const Watchman = () => {
    const map = useMapEvents({
      click(evt) {
        console.log("evt", evt);
      },
    });

    return null;
  };

  return (
    <main>
      <h1>Hello world</h1>
      <div style={{ width: "800px", height: "500px" }}>
        <MapContainer center={[48.8566, 2.3522]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Watchman />
        </MapContainer>
      </div>
    </main>
  );
}

export default App;
