import MapComponent, { Marker } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
const Map = () => {
  return (
    <MapComponent
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 1,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </MapComponent>
  );
};

export default Map;
