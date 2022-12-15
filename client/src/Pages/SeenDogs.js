import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

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
    .map((dogObject) => dogObject.attributes.image_url)
    .map((url, index) => <ImageListItem  key={index}> <img src={url}  loading="lazy" alt="dog picture"/>  </ImageListItem>);


return (
 <Box>
    <Navbar />
   <ImageList>
    <h1 style={{marginTop: "5rem"}}> Seen Dogs</h1>
    {imageArray}
    </ImageList>
  </Box>
);
}
export default SeenDogs;
