import React, { useState, useMemo, useCallback, useRef } from "react";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import dogPaw from "../Pages/dog-paw.svg";

import Locate from "./Locate";

const mapContainerStyle = {
  margin: "0 auto",
  width: "75vw",
  height: "75vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

function FinderMap() {
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }),[]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const panTo = useCallback(({lat,lng}) => {
    mapRef.current.panTo( {lat, lng} );
    mapRef.current.setZoom(15);
  }, []);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={options}
        
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            draggable = {true}
            icon={{
              url: dogPaw,
              scaledSize: new window.google.maps.Size(20, 20),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2> Dog Sighted!</h2>
              <p> Sighted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      <Locate panTo={panTo}/> 
      </GoogleMap>
      
    </div>
  );
}

export default FinderMap;
