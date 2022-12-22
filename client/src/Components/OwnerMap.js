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
import Box from "@mui/material/Box";

const mapContainerStyle = {
  margin: "0 auto",
  width: "60vw",
  height: "60vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function OwnerMap({ setShowOwnerMap, sightingsArray }) {
  console.log(sightingsArray);
  const [selected, setSelected] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }), []);
  const mapRef = useRef();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  function compareSightingTimes(a, b) {
    return a - b;
  }

  function toggleInfoWindow() {
    setShowContactInfo(!showContactInfo);
  }

  const sortedSightingsArray = sightingsArray.sort(compareSightingTimes);
  const markers =
    window.google &&
    sightingsArray.map((sighting) => {
      const date = new Date(sighting.created_at).toLocaleString();
      return (
        <div key={sighting.id}>
          <MarkerF
            position={{
              lat: Number(sighting.lat),
              lng: Number(sighting.lng),
            }}
            icon={{
              url: dogPaw,
              scaledSize: new window.google.maps.Size(20, 20),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
          <InfoWindowF
            options={{ pixelOffset: new window.google.maps.Size(0, -15) }}
            maxWidth={50}
            position={{ lat: sighting.lat, lng: sighting.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div style={{ maxHeight: "100px", maxWidth: "75px" }}>
              <h3 style={{ color: "red" }}>
                {sortedSightingsArray.indexOf(sighting) + 1}
              </h3>
              <p>Seen at: {date}</p>
              {sighting.contact_finder ? (
                <Button
                  onClick={() => toggleInfoWindow()}
                  size="small"
                  variant="contained"
                  sx={{ height: "40px", width: "20px" }}
                >
                  Contact Finder
                </Button>
              ) : null}
            </div>
          </InfoWindowF>{" "}
          {showContactInfo ? (
            <InfoWindowF
              options={{ pixelOffset: new window.google.maps.Size(0, -15) }}
              maxWidth={50}
              position={{ lat: sighting.lat, lng: sighting.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div style={{ maxHeight: "100px", maxWidth: "75px" }}>
                <h3 style={{ color: "red" }}>{sighting.contact_method}</h3>
              </div>
            </InfoWindowF>
          ) : null}
        </div>
      );
    });

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
      >
        {markers ? markers : null}
      </GoogleMap>
      <Button
        variant="contained"
        onClick={() => setShowOwnerMap((showOwnerMap) => !showOwnerMap)}
        sx={{ height: "45px", marginTop: "2.5rem" }}
      >
        Back to Details
      </Button>
    </div>
  );
}

export default OwnerMap;
