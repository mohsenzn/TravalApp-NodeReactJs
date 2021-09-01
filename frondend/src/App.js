import React, { useState } from "react";
import "./App.css";
import ReactMapGL, { Marker } from "react-map-gl";

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const REACT_APP_MAPBOX_ACCESS_TOKEN = `pk.eyJ1IjoidmlwMjg1MjciLCJhIjoiY2t0MGZ0YXAzMDAyMjJvbnpob2p4YWdjMyJ9.sFXzc2nqnpaDI0O50YsBgA`;

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
}

export default App;
