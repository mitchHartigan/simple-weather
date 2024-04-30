import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  FeatureGroup,
  Rectangle,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useEffect } from "react";

export function MapView(props) {
  const { updateCoords, loading } = props;
  const { regionBounds, coordinates } = props.forecast;
  const { lat, lng } = coordinates;

  const Updater = (props) => {
    const { bounds } = props;
    const map = useMap();

    useEffect(() => {
      if (loading) return;
      map.fitBounds(bounds, { animate: true, maxZoom: 12 });
    }, [bounds]);

    return null;
  };

  const Cursor = () => {
    return (
      <Circle
        center={coordinates}
        radius={100}
        pathOptions={{ color: "#45415c" }}
      />
    );
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
    <Container>
      <div style={{ width: "800px", height: "500px" }}>
        <MapContainer center={[lat, lng]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickListener />
          <FeatureGroup pathOptions={{ color: "#d54c7e" }}>
            <Rectangle bounds={regionBounds} />
          </FeatureGroup>
          <Cursor />
          <Updater bounds={regionBounds} />
        </MapContainer>
      </div>
    </Container>
  );
}

const Container = styled.section`
  margin-left: 20px;
`;
