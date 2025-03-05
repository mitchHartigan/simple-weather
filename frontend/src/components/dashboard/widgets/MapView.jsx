import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

  // const Cursor = () => {
  //   return (
  //     <Circle
  //       center={coordinates}
  //       radius={100}
  //       pathOptions={{ color: "#45415c" }}
  //     />
  //   );
  // };

  const Cursor = () => {
    return (
      <Marker position={coordinates}>
        <Popup>Ayy lmao</Popup>
      </Marker>
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
      <div style={{ width: "50vw", height: "45vh" }}>
        <MapContainer center={[lat, lng]} zoom={13}>
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            maxZoom={17}
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution={`Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)`}
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
