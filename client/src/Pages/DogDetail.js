import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/system";
import Grid2 from '@mui/material/Unstable_Grid2'

function DogDetail() {
  const { id } = useParams();
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
  return (
    <Box >
      <Navbar />
      <Grid2 container border={'2px solid red'}width={'50%'} height={'300px'} margin={'7rem auto'}>
        {dogDetails && 
           <img style={{'width':'100%', 'height':'100%'}}src={dogDetails.picture} alt={"specific dog picture"} />}
           
           
      </Grid2>
    </Box>
  );
}

export default DogDetail;
