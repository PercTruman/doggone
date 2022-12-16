import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

function SeenDogs() {
  const [imageGallery, setImageGallery] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    getDogs();
  }, []);

  function getDogs() {
    fetch("/lost_dogs")
      .then((res) => res.json())
      .then((data) => {
        setImageGallery(data);
      }, []);
  }
  const fullDogObjects =
    imageGallery &&
    imageGallery.data.filter((dog) => (dog.attributes.image_url ? dog : null));


  return (
    <Box>
      <Navbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems={"center"}
        justifyContent={"center"}
        style={{ minHeight: "10vh" }}
      >
        <Typography variant="h2" align="center" style={{ color: "#85BBCC" }}>
          {" "}
          Seen Dogs
        </Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <ImageList
          gap={10}
          sx={{ paddingTop: "5rem", width: "75vw", height: "60vh" }}
          cols={3}
        >
      {fullDogObjects && fullDogObjects
          .map((dogObject) =>
          
          
            <ImageListItem key={dogObject.id}>
              {" "}
              <img
                src={dogObject.attributes.image_url}
                loading="lazy"
                alt="doggy"
              />{" "}
              <ImageListItemBar
                title= {<span>{dogObject.attributes.breed}</span> }
                subtitle={<span> {dogObject.attributes.age_group}</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${dogObject.id}`}
                    onClick={()=>navigate(`/-seen_dogs/${dogObject.id}`)}
                  >
                    <InfoIcon />
                  </IconButton>
                  }
              />{" "}
            </ImageListItem>
        )}
        </ImageList>
      </Grid>
    </Box>
  );
}
export default SeenDogs;
