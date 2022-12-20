import React, { useState, useMemo, useCallback, useRef } from "react";

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import dogPaw from "../Pages/dog-paw.svg";
import Button from "@mui/material/Button";

const mapContainerStyle = {
  margin: "0 auto",
  width: "60vw",
  height: "60vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function OwnerMap({ setShowOwnerMap }) {
  
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ paddingTop: "3rem" }}>
      <h2 style={{ color: "#85BBCC" }}>Sightings for this dog:</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        onLoad={onMapLoad}
        options={options}
      ></GoogleMap>
      <Button
        variant="contained"
        onClick={ ()=>setShowOwnerMap((showOwnerMap) => !showOwnerMap)}
        sx={{ height: "45px", marginTop: "2.5rem" }}
      >
        Back to Details
      </Button>
    </div>
  );
}

export default OwnerMap;
