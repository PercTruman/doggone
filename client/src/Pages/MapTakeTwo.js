import React, { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
      lat: 32.59048,
      lng: -97.04098,
    };
function MapTakeTwo() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
      ></GoogleMap>
    </div>
  );
}

export default MapTakeTwo;
