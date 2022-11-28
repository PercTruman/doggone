import React, { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import dogPaw from './dog-paw.svg';

const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];
function MapTakeTwo() {
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }));
  const { isLoaded } = useLoadScript({
    
   key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    // (e) => {
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
      >
        {markers.map((marker) => (
           
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon = {{
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
      </GoogleMap>
    </div>
  );
}

export default MapTakeTwo;
