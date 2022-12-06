import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { ImageUpload } from "./ImageUpload";

function FinderForm({ handleSubmit, setFormData, formData }) {
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds?page=0")
      .then((res) => res.json())
      .then((data) => setBreedNames(data));
  }, []);

  const { user } = useContext(UserContext);
  const [breedNames, setBreedNames] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      finder_id: user.id,
    });
  };

  const sexChoices = ["Male", "Female", "Neutered Male", "Spayed Female"];
  const sexDropDownOptions = sexChoices.map((choice) => (
    <MenuItem key={choice} type="text" name="choice" value={choice}>
      {choice}
    </MenuItem>
  ));

  const colorChoices = [
    "Black",
    "White",
    "Light Brown",
    "Dark Brown",
    "Golden",
    "Gray",
    "Cream",
    "Other",
  ];
  const colorDropDownOptions = colorChoices.map((choice) => (
    <MenuItem key={choice} type="text" name="choice" value={choice}>
      {choice}
    </MenuItem>
  ));

  const ageChoices = ["Baby", "Puppy", "Adult", "Mature"];
  const ageDropDownOptions = ageChoices.map((choice) => (
    <MenuItem key={choice} type="text" name="choice" value={choice}>
      {choice}
    </MenuItem>
  ));

  const contacts = ["Text Message", "Phone", "Email", "No Contact"];
  const contactOptions = contacts.map((choice) => (
    <MenuItem key={choice} type="text" name={choice} value={choice}>
      {choice}
    </MenuItem>
  ));

  const breedList =
    breedNames &&
    breedNames.map((breed) => (
      <MenuItem key={breed.id} value={breed.name}>
        {breed.name}
      </MenuItem>
    ));

  return (
    <Box>
      {/* <Box> */}
        <Grid container flexDirection="column" justifyContent={"center"} >
          <form onSubmit={handleSubmit}>
            
            <ImageUpload />
            {/* <Box
             
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
            > */}
              {/* <Box
                border={"2px solid yellow"}
                display={"flex"}
                width={"300px"}
                alignItems={"center"}
                justifyContent={"space-around"}
              > */}
              <Grid  item border={'2px solid blue'}  >
                <FormControl >
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      paddingTop: "9px",
                      paddingLeft: "15px",
                    }}
                  >
                    {" "}
                    Primary Color
                  </InputLabel>
                  <Select
                    value={formData.color}
                    name="color"
                    sx={{
                      margin: "1rem",
                      background: "white",
                      width: "125px",
                      height: "40px",
                    }}
                    onChange={handleChange}
                  >
                    {colorDropDownOptions}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: "1em", maxWidth: "150px" }}>
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      paddingTop: "9px",
                      paddingLeft: "15px",
                    }}
                  >
                    Sex
                  </InputLabel>
                  <Select
                    value={formData.sex}
                    name="sex"
                    sx={{
                      background: "white",
                      margin: "1rem",
                      width: "125px",
                      height: "40px",
                    }}
                    onChange={handleChange}
                  >
                    {sexDropDownOptions}
                  </Select>
                </FormControl>
                </Grid>
              {/* </Box> */}
              {/* <Box
                border={"2px solid yellow"}
                display={"flex"}
                width={"300px"}
                alignItems={"center"}
                justifyContent={"space-between"}
              > */}
              <Grid item border={'2px solid red'} >
                <FormControl >
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      paddingTop: "9px",
                      paddingLeft: "15px",
                    }}
                  >
                     {" "}
                    Breed
                  </InputLabel>
                  <Select
                    value={formData.breed}
                    name="breed"
                    sx={{
                      margin: "1rem",
                      marginLeft: '0px',
                      background: "white",
                      width: "125px",
                      height: "40px",
                    }}
                    onChange={handleChange}
                  >
                    {breedList}
                  </Select>
                </FormControl>
                <a
                  href="https://www.dogthelove.com/category"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    sx={{
                      width: "100px",
                      fontSize: "8px",
                    }}
                    variant="contained"
                  >
                    Breed Pictures
                  </Button>
                </a>
                </Grid>
              {/* <Box border={"2px solid yellow"}> */}
              <Grid item>
                <FormControl
                  sx={{ mb: "1em", width: "150px" }}
                >
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      paddingTop: "8px",
                      paddingLeft: "5px",
                    }}
                  >
                    Age Group
                  </InputLabel>
                  <Select
                    value={formData.age_group}
                    name="age_group"
                    sx={{
                      margin: "1rem",
                      background: "white",
                      width: "125px",
                      height: "40px",
                    }}
                    onChange={handleChange}
                  >
                    {ageDropDownOptions}
                  </Select>
                </FormControl>
                <TextField
                  label="Additional Details:"
                  multiline
                  size="medium"
                  sx={{
                    maxWidth: "150px",
                    borderRadius: "3px",
                    background: "white",
                  }}
                  id="outlined-basic"
                  variant="outlined"
                  name="additional_details"
                  type="text"
                  value={formData.additional_details}
                  onChange={handleChange}
                />
             </Grid>
              <Box border={"2px solid yellow"}>
                <FormControl fullWidth sx={{ mb: "1em", maxWidth: "150px" }}>
                  <InputLabel
                    sx={{
                      fontSize: "12px",
                      paddingTop: "8px",
                      paddingLeft: "5px",
                    }}
                  >
                    {" "}
                    Contact Me By:
                  </InputLabel>
                  <Select
                    value={formData.contact_method}
                    name="contact_method"
                    sx={{
                      background: "white",
                      margin: "1rem",
                      maxWidth: "200px",
                      maxHeight: "35px",
                    }}
                    onChange={handleChange}
                  >
                    {contactOptions}
                  </Select>
                </FormControl>

                <Button
                  sx={{
                    background: "red",
                    mb: "5em",
                    marginLeft: "4em",
                    padding: "7px",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Create Sighting
                </Button>
              </Box>
              
            {/* </Box> */}
          </form>
        </Grid>
      {/* </Box> */}
    </Box>
  );
}

export default FinderForm;
