import React, { useContext, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import FinderMap from "../Components/FinderMap";
import FinderForm from "../Components/FinderForm";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";

function NewSighting() {
  const location = useLocation();
  const dogId = location.state
  const { user } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const mapRef = useRef();
  const {id} = useParams()

  const [formData, setFormData] = useState({
    image: null,
    color: "",
    sex: "",
    breed: "",
    age_group: "",
    additional_details: "",
    map_lat: latitude,  
    map_lng: longitude,
    contact_finder: false,
    contact_method: "",
    time_of_sighting: "",
    date_of_sighting: "",
    finder_id: user && user.id,
    owner_id: "",
  });

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Navbar />
      <Box sx={{ textAlign: "center", fontSize: "30px" }}>
        <h3
          style={{
            marginTop: "1rem",
            paddingBottom: "0",
            marginBottom: "0",
            color: "#85BBCC",
          }}
        >
          Create New Sighting
        </h3>
      </Box>
      {showMap ? (
        <Box>
          <FinderMap
            dogId={dogId}
            setShowMap={setShowMap}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            mapRef={mapRef}
          />
        </Box>
      ) : null}
      {!showMap ? (
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Box padding={"4rem"} marginRight={"6rem"}>
              <FinderForm
                id = {id}
                latitude={latitude}
                longitude={longitude}
                formData={formData}
                setFormData={setFormData}
              />
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default NewSighting;
