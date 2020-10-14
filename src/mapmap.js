import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/places.json";


export default function Mapmap() {
  
  
  const [viewport, setViewport] = useState({
    latitude: 65.012093,
    longitude: 25.465076,
    width: "100vw",
    height: "100vh",
    zoom: 10
    
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPlace(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
      
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoic3lyZGUxMiIsImEiOiJja2c3NGhqZGswM3JqMnFxb2lybGVqZ3NxIn0.Lk8KakMzzarnhh3UxLO_Ow"
        mapStyle="mapbox://styles/syrde12/ckg7792zb5aoo19qhm3b8u97e"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPlace(park);
              }}
            >
              <h1> 🔋 </h1> 
            </button>
          </Marker>
        ))}

        {selectedPlace ? (
          <Popup
            latitude={selectedPlace.geometry.coordinates[1]}
            longitude={selectedPlace.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPlace(null);
            }}
          >
            <div>
              <h2>{selectedPlace.properties.NAME}</h2>
              <p>{selectedPlace.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
     
    
    </div>
  );
}
