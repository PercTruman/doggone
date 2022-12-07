import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from '@mui/material/Unstable_Grid2'
import { ImageUpload } from "./ImageUpload";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
    <Box border={"2px solid red"} sx={{ flexGrow: 1 }}>
      <h4
        style={{
          fontSize: "16px",
          color: "#85BBCC",
          marginTop: "0",
          marginBottom: "2rem",
          padding: "0",
        }}
      >
        Using this form, please upload a photo, and/or provide additional
        details about the dog you saw.
      </h4>

      <Grid2 container spacing={2} border={'2px solid green'} justifyContent={'center'}>
        <form onSubmit={handleSubmit}>
          <ImageUpload />
          <Grid2 xs display="flex" justifyContent="center" alignItems="center" border={"2px solid blue"} >
            <Item>
             
              <FormControl>
                <InputLabel
                  sx={{
                    fontSize: "12px",
                    paddingTop: "9px",
                    paddingLeft: "15px",
                  }}
                >
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
            </Item>
          </Grid2>
          <Grid2  xs display="flex" justifyContent="center" alignItems="center">
            <Item>
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
            </Item>
          </Grid2>

          <Grid2 xs display="flex" justifyContent="center" alignItems="center"border={"2px solid red"}>
            <FormControl>
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
                  marginLeft: "0px",
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
          </Grid2>
          <Grid2 xs display="flex" justifyContent="center" alignItems="center" border={"2px solid green"}>
            <FormControl sx={{ mb: "1em", width: "150px" }}>
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
          </Grid2>
          <Grid2 xs display="flex" justifyContent="center" alignItems="center"border={"2px solid yellow"}>
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
                  margin: "1rem auto",
                  width: "125px",
                  height: "40px",
                }}
                onChange={handleChange}
              >
                {contactOptions}
              </Select>
            </FormControl>
          </Grid2>
          <Button
            sx={{
              background: "red",
              mb: "5em",
              margin: "1rem auto",
              padding: "7px",
            }}
            variant="contained"
            type="submit"
          >
            Create Sighting
          </Button>
        </form>
      </Grid2>
    </Box>
  );
}

export default FinderForm;
