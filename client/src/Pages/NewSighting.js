import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import FinderMap from "../Components/FinderMap";
import FinderForm from "../Components/FinderForm";
import Box from "@mui/material/Box";



function NewSighting() {
  const { user } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapRef = useRef();

  return (
    <Box>
      NewSighting
      <FinderForm latitude={latitude} longitude={longitude} />
      <FinderMap
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            mapRef={mapRef}
          />
    </Box>
  );
}

export default NewSighting;
