import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Rectangle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";

export function MapView(props) {
  const { regionBounds, coordinates } = props.forecast;
  const { lat, lng } = coordinates;

  const Updater = (props) => {
    const { regionBounds } = props;
    const map = useMap();
  };

  const ClickListener = () => {
    const map = useMapEvents({
      click(evt) {
        const { lat, lng } = evt.latlng;
        console.log({ lat, lng });
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
          <Updater />
        </MapContainer>
      </div>
    </section>
  );
}
