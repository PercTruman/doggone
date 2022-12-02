import React, { useState, useMemo, useCallback, useRef} from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
import dogPaw from "../Pages/dog-paw.svg";
import Locate from "./Locate";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const mapContainerStyle = {
  margin: "10rem 5rem",
  width: "50vw",
  height: "50vh",
  padding: "2rem"
};



const options = {
  disableDefaultUI: true,
  zoomControl: true,
};


function FinderMap({ setShowMap, setLatitude, setLongitude, mapRef }) {
  const [showSaveWindow, setShowSaveWindow] = useState(false)
  const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
 
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const [marker, setMarker] = useState( null);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setShowSaveWindow(true)
    setLatitude(e.latLng.lat);
    setLongitude(e.latLng.lng);
    setMarker(
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    );
    
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const removeMarker=()=>{
    setMarker( null)
    setSelected(null)
  }
  const saveMarker=()=>{
  
    setShowMap(false)
    alert("Dog Location saved successfully.")
  }
  console.log(marker)
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
     
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={options}
      >
       
        {marker ?
          <Marker
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
          /> : null}
        {/* ))} */}
        {showSaveWindow && selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2> Save this Location?</h2>
              {/* <p> Sighted {formatRelative(selected.time, new Date())}</p> */}
              <Box display="flex" justifyContent={"space-around"}>
              <Button onClick={()=>saveMarker()}margin ="10px" size="small" variant="contained">Yes</Button>
              <Button onClick={()=>removeMarker()}margin = "10px" size="small" variant="contained">No</Button>
              </Box>
            </div>
          </InfoWindow>
        ) : null}
         <Locate panTo={panTo} />
      </GoogleMap>
     
    </div>
  );
}

export default FinderMap;
