import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import FinderMap from "../Components/FinderMap";
import FinderForm from "../Components/FinderForm";
import Box from "@mui/material/Box";

function NewSighting() {
  const { user } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
   const [showMap, setShowMap] = useState(true)
  const mapRef = useRef();

  return (
    <Box padding={0}>
      <Box sx={{ textAlign: "center" }}>
        <h2 style={{ paddingTop: "2rem", marginTop: 0, color: "#85BBCC"}}>
          Create New Sighting
        </h2>
      </Box>
      <Box display={"flex"}>
        <Box>
          <FinderForm latitude={latitude} longitude={longitude} />
        </Box>
        {showMap ? 
        <Box>
          <FinderMap
          setShowMap={setShowMap}
          latitude={latitude}
          longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            mapRef={mapRef}
          />
        </Box> : null}
      </Box>
    </Box>
  );
}

export default NewSighting;
