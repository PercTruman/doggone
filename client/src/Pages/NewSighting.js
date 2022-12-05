import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../UserContext";
import FinderMap from "../Components/FinderMap";
import FinderForm from "../Components/FinderForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function NewSighting() {
  const { user } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const mapRef = useRef();

  const [formData, setFormData] = useState({
    color: "",
    sex: "",
    breed: "",
    age_group: "",
    additional_details: "",
    img: "",
    map_lat: latitude,
    map_lng: longitude,
    contact_finder: false,
    contact_method: "",
    time_of_sighting: "",
    date_of_sighting: "",
    finder_id: "",
    owner_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/sightings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          alert(
            "Thank you for submitting.  Your sighting has been saved successfully. If you allowed your contact information to be visible, you may be contacted soon."
          );

          setFormData({
            color: "",
            sex: "",
            breed: "",
            age_group: "",
            additional_details: "",
            img: "",
            map_lat: "",
            map_lng: "",
            contact_finder: false,
            contact_method: "",
            time_of_sighting: "",
            date_of_sighting: "",
            finder_id: "",
            owner_id: "",
          });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  return (
    <Box padding={0}>
      <Box sx={{ textAlign: "center" }}>
        <h2 style={{ paddingTop: "2rem", marginTop: 0, color: "#85BBCC" }}>
          Create New Sighting
        </h2>
      </Box>
      <Box display={"flex"}>
        <Box>
          <FinderForm
            latitude={latitude}
            longitude={longitude}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </Box>
        {showMap ? (
          <Box>
            <FinderMap
              setShowMap={setShowMap}
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              mapRef={mapRef}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default NewSighting;
