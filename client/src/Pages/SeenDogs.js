import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";


function SeenDogs() {
  const [imageGallery, setImageGallery] = useState(null);
  useEffect(() => {
    fetch("/lost_dogs")
      .then((res) => res.json())
      .then((data) => {
        setImageGallery(data);
      }, [imageGallery]);
  });

  const imageArray =  imageGallery && imageGallery.data
    .filter(dog => dog.attributes.image_url ? dog.attributes.image_url : null)
    .map((dogObject) => dogObject.attributes.image_url)
    .map((url, index) => <ImageListItem  key={index}> <img src={url}  border="5px solid red" loading="lazy" alt="dog picture"/>  </ImageListItem>);


return (
 <Box>
    <Navbar />
    <Grid container spacing={0} direction="column" alignItems={"center"} justifyContent={"center"} style={{ minHeight: '10vh' }}>
        <Typography variant="h2" align="center" style={{ color: "#85BBCC"}}> Seen Dogs</Typography>
    </Grid>
    <Grid container alignItems="center" justifyContent="center">
   <ImageList  gap={10} sx={{paddingTop: "5rem",width: "75vw", height: "60vh"}} cols={3}  >
   
    {imageArray}
    </ImageList>
    </Grid>
  </Box>
);
}
export default SeenDogs;
