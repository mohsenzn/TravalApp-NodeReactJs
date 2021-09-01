import React, { useEffect, useState } from "react";
import "./App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 48.7577,
    longitude: 2.2365,
    zoom: 4,
  });
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("mohi");
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const REACT_APP_MAPBOX_ACCESS_TOKEN = `pk.eyJ1IjoidmlwMjg1MjciLCJhIjoiY2t0MGZ0YXAzMDAyMjJvbnpob2p4YWdjMyJ9.sFXzc2nqnpaDI0O50YsBgA`;
  useEffect(() => {
    const getAllPin = async () => {
      try {
        const allPins = await axios.get("/pins");
        // console.log(allPins);
        setPins(allPins.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPin();
  }, []);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const handleAddPlace = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={handleAddPlace}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="top"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p>{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <label className="username">Information</label>
                  <span className="username">
                    Create By <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            onClose={() => setNewPlace(null)}
          >
            <p>hello</p>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
