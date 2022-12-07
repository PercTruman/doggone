import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
import dogPaw from "../Pages/dog-paw.svg";
import Locate from "./Locate";
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

function FinderMap({ setShowMap, setLatitude, setLongitude, mapRef }) {
  const [showSaveWindow, setShowSaveWindow] = useState(false);
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const [marker, setMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setShowSaveWindow(true);
    setLatitude(e.latLng.lat);
    setLongitude(e.latLng.lng);
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const removeMarker = () => {
    setMarker(null);
    setSelected(null);
  };
  const saveMarker = () => {
    setShowMap(false);
    alert("Dog Location saved successfully.");
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div style={{border: '2px solid red'}}>
      <h2  style={{color: "#85BBCC"}}>Click the map to mark the location of the dog:</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={options}
      >
        {marker ? (
          <div>
            <MarkerF
              key={marker.time}
              position={{ lat: marker.lat, lng: marker.lng }}
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
            <InfoWindowF
              options={{ pixelOffset: new window.google.maps.Size(0, -15) }}
              position={{ lat: marker.lat, lng: marker.lng }}
              onCloseClick={() => {
                setSelected(null);
                removeMarker();
              }}
            >
              <div>
                <h2> Save this Location?</h2>
                <Box display="flex" justifyContent={"space-around"}>
                  <Button
                    onClick={() => saveMarker()}
                    margin="10px"
                    size="small"
                    variant="contained"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => {
                      removeMarker();
                      setSelected(null);
                    }}
                    margin="10px"
                    size="small"
                    variant="contained"
                  >
                    No
                  </Button>
                </Box>
              </div>
            </InfoWindowF>{" "}
          </div>
        ) : null}
        <Locate panTo={panTo} />
      </GoogleMap>
    </div>
  );
}

export default FinderMap;
