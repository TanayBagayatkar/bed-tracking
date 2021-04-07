import React, { useState } from "react";
import ReactMapGl from "react-map-gl";
import MapMarker from "./MapMarker";

function MapWindow(props) {
  const [viewport, setViewport] = useState({
    latitude: 19.1172495,
    longitude: 72.833968,
    zoom: 14,
    width: "100%",
    height: "100vh",
  });

  const onMapLoad = () => {};

  const apik =
    "pk.eyJ1IjoidGFuYXliYWdheWF0a2FyIiwiYSI6ImNrbWVyazA1ODJ4eGUyb3AxbGl6eTdiODcifQ.xIeXNH630rWCTM_0u1CFHQ";
  return (
    <div className="map-data">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={apik}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onLoad={onMapLoad}
      >
        <MapMarker />
      </ReactMapGl>
    </div>
  );
}

export default MapWindow;
