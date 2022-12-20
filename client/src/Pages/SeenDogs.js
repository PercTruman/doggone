import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate} from "react-router-dom";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Grid from "@mui/material/Unstable_Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";


function SeenDogs() {
  const { loggedIn } = useContext(UserContext);
  const [imageGallery, setImageGallery] = useState(null);
  const navigate = useNavigate();
 

  useEffect(() => {
    getDogs();
  }, []);

  const actions = loggedIn
    ? [
        { icon: <VisibilityIcon />, name: "Add sighting for this dog " },
        { icon: <InfoIcon />, name: "View sightings for this dog" },
      ]
    : [{ icon: <VisibilityIcon />, name: "Add sighting for this dog " }];

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
        paddingTop={"1rem"}
      >
        <Typography variant="h2" align="center" style={{ color: "#85BBCC" }}>
          {" "}
          Seen Dogs
        </Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <ImageList
          gap={10}
          sx={{ paddingTop: "1rem", width: "75vw", height: "60vh" }}
          cols={3}
        >
          {fullDogObjects &&
            fullDogObjects.map((dogObject) => (
              <ImageListItem key={dogObject.id}>
                {" "}
                <img
                  src={dogObject.attributes.image_url}
                  loading="lazy"
                  alt="doggy"
                />{" "}
                <ImageListItemBar
                  title={<span>{dogObject.attributes.breed}</span>}
                  subtitle={<span> {dogObject.attributes.age_group}</span>}
                />
                <SpeedDial
                  ariaLabel="SpeedDial"
                  direction="down"
                  sx={{
                    "& .MuiFab-primary": { width: 40, height: 40 },
                    position: "absolute",
                    top: 10,
                    right: 5,
                  }}
                  icon={<SpeedDialIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={()=> {
                        action.name === "Add sighting for this dog " ? navigate(`/-new_sighting/${dogObject.id}`, {state:dogObject.id}): navigate(`/-seen_dogs/${dogObject.id}`)
                      }}
                    />
                  ))}
                </SpeedDial>
              </ImageListItem>
            ))}
        </ImageList>
      </Grid>
    </Box>
  );
}
export default SeenDogs;
