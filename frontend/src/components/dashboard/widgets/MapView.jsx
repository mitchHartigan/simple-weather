import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Rectangle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useEffect } from "react";

export function MapView(props) {
  const { updateCoords } = props;
  const { regionBounds, coordinates } = props.forecast;
  const { lat, lng } = coordinates;

  const Updater = (props) => {
    const { bounds } = props;
    const map = useMap();

    useEffect(() => {
      map.fitBounds(bounds, { animate: true, maxZoom: 12 });
    }, [bounds]);

    return null;
  };

  const ClickListener = () => {
    const map = useMapEvents({
      click(evt) {
        const { latlng } = evt;
        updateCoords(latlng);
      },
    });

    return null;
  };

  return (
    <section>
      <div style={{ width: "800px", height: "500px" }}>
        <MapContainer center={[lat, lng]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickListener />
          <FeatureGroup pathOptions={{ color: "green" }}>
            <Rectangle bounds={regionBounds} />
          </FeatureGroup>
          <Updater bounds={regionBounds} />
        </MapContainer>
      </div>
    </section>
  );
}
