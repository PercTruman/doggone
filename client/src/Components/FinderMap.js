import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 32.59048,
  lng: -97.04098,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
export default function FinderMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback(() =>{
    (e) => {
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) =>{
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps failed";

  return (
    <div>
      <h1>Doggone 🐶</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
                url: './dog-paw.svg',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15)
            }}
            onClick={()=> {
                setSelected(marker);
            }}
          />
        ))
        }
        {selected ? (<InfoWindow position ={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=> setSelected(null)}>
            <div>
                <h2> Dog Sighted!</h2>
                <p> Sighted {formatRelative(selected.time, new Date())}</p>
            </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>
  );
}
