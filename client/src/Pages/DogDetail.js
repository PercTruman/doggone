import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Box} from "@mui/system";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import OwnerMap from "../Components/OwnerMap";
import Button from "@mui/material/Button";

function DogDetail() {
  const { id } = useParams();
  const [showOwnerMap, setShowOwnerMap] = useState(false)
  const [dogDetails, setDogDetails] = useState(null);
  useEffect(() => {
    getDogDetails();
  }, []);

  function getDogDetails() {
    fetch(`/seen_dogs/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setDogDetails({
          picture: data.image_url,
          age: data.age_group,
          sex: data.sex,
          breed: data.breed,
          color: data.color,
          contact_finder: data.contact_finder,
          contact_method: data.contact_method,
        })
      );
  }

  if(!dogDetails) return null;

  return (
    <Box>
      <Navbar />
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems={"center"}
        justifyContent={"center"}
        style={{ minHeight: "10vh" }}
        paddingTop={"1rem"}
      >
        <Typography variant="h2" align="center" style={{ color: "#85BBCC" }}>
          {" "}
          Dog Detail
        </Typography>
      </Grid2>
      <Grid2
        container
        justifyContent={"center"}
        width={"500px"}
        height={"400px"}
        margin={"3rem auto"}
      >
        {dogDetails && (
          <img
            style={{ width: "400px", height: "300px" }}
            src={dogDetails.picture}
            alt={"specific dog picture"}
            border={"2px solid #85BBCC"}
          />
        )}
        <Grid2
          margin={"1rem auto"}
          padding={"1rem"}
          backgroundColor={"darkGray"}
          border={"2px solid black"}
        >
          <p style={{ fontWeight: "bold" }}>Breed: {dogDetails.breed}</p>
          <p style={{ fontWeight: "bold" }}>
            Age Range: {dogDetails.age.toLowerCase()}
          </p>
          <p style={{ fontWeight: "bold" }}>
            Sex: {dogDetails.sex.toLowerCase()}
          </p>
        </Grid2>

      </Grid2>
      <Button variant="contained" onClick={()=>setShowOwnerMap(showOwnerMap =>!showOwnerMap)} sx={{height:'45px', marginTop:'2.5rem'}}>{showOwnerMap ? 'Close Map':'Show Sightings Map'}</Button>
      {showOwnerMap? <OwnerMap/> : null}
    </Box>
    
  );
}

export default DogDetail;
