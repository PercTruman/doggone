import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Unstable_Grid2";


function FinderForm({ setFormData, formData }) {
  const [lostDog, setLostDog] = useState(null)
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds?page=0")
      .then((res) => res.json())
      .then((data) => setBreedNames(data));
  }, []);

  useEffect(()=>{
    lostDog && createSighting()
  }, [lostDog])

  const { user } = useContext(UserContext);
  const [breedNames, setBreedNames] = useState([]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      finder_id: user.id,
    });
  };


  function handleSubmit(e) {
    e.preventDefault();
    const lostDogData = new FormData()
    lostDogData.append("lost_dog[image]", e.target.image.files[0]);
    lostDogData.append("lost_dog[color]", formData.color);
    lostDogData.append("lost_dog[sex]", formData.sex);
    lostDogData.append("lost_dog[breed]", formData.breed);
    lostDogData.append("lost_dog[age_group]", formData.age_group);
    lostDogData.append("lost_dog[additional_details]", formData.additional_details);
    lostDogData.append("lost_dog[contact_method]", formData.contact_method)
    lostDogData.append("lost_dog[contact_finder]", formData.contact_finder)

    createLostDog(lostDogData);
    createSighting()
  }

  function createLostDog(data) {
    fetch("/lost_dogs", {
      method: "POST",
      body: data
    }).then((res) => res.json().then((data) => {
      setImage(data.image_url);
      setLostDog(data)}))
      .catch((err) => console.error(err));
  };

  const sightingData = {
    lost_dog_id: lostDog && lostDog.id,
    map_lat: formData.map_lat,
    map_lng: formData.map_lng,
    finder_id: formData.finder_id,
    // owner_id: formData.owner_id,
  };



    const createSighting=()=>{
      fetch("/sightings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sightingData),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            alert(
              "Thank you for submitting.  Your sighting has been saved successfully. If you allowed your contact information to be visible, you may be contacted soon."
            );
  
            setFormData({
              additional_details: "",
              map_lat: "",
              map_lng: "",
              contact_finder: false,
              contact_method: "",
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
    }


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
    <Box sx={{ flexGrow: 1 }}>
      <h4
        style={{
          fontSize: "16px",
          color: "#85BBCC",
          marginTop: "0",

        }}
      >
        Using this form, please upload a photo, and/or provide additional
        details about the dog you saw.
      </h4>


      <Grid2
        container
        backgroundColor={'darkGray'}
        padding={'1rem'}
        borderRadius={'10px'}
        spacing={2}
        justifyContent={"center"}
      >
        <form onSubmit={handleSubmit}>
          {/* <ImageUpload setPictures={setPictures}/> */}
          <h3 style={{ color: 'black', marginTop: '0' }}>Upload Image</h3>
          <input type="file" name="image" id="image" placeholder="Dog Image" />
          <img src={image} alt="Dog Image" />

          <Grid2
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={"2rem"}
          >
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontSize: "12px",
                  fontWeight: 'bold',
                  paddingTop: "10px",
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
                  width: "150px",
                  height: "40px",
                }}
                onChange={handleChange}
              >
                {colorDropDownOptions}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  paddingTop: "10px",
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
                  width: "150px",
                  height: "40px",
                }}
                onChange={handleChange}
              >
                {sexDropDownOptions}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontSize: "12px",
                  paddingTop: "10px",
                  paddingLeft: "15px",
                  fontWeight: "bold"
                }}
              >
                Breed
              </InputLabel>
              <Select
                value={formData.breed}
                name="breed"
                sx={{
                  margin: "1rem",
                  paddingTop: '5px',
                  background: "white",
                  width: "150px",
                  height: "40px",
                }}
                onChange={handleChange}
              >
                {breedList}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  paddingTop: "10px",
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
                  width: "150px",
                  height: "40px",
                }}
                onChange={handleChange}
              >
                {ageDropDownOptions}
              </Select>
            </FormControl>
          </Grid2>
          <a
            href="https://www.dogthelove.com/category"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              sx={{
                fontSize: "8px",
                width: "100px",
                backgroundColor: '#F6E89D',
                color: "black",
                marginBottom: '2rem'
              }}
              variant="contained"
            >
              Breed Pictures
            </Button>
          </a>
          <Grid2
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="Additional Details:"
              multiline
              size="small"
              sx={{
                fontWeight: "bold",
                width: "200px",
                borderRadius: "3px",
                background: "white",
              }}
              fontSize='12px'
              id="outlined-basic"
              variant="outlined"
              name="additional_details"
              type="text"
              value={formData.additional_details}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl fullWidth sx={{ mb: "1em", width: "150px" }}>
              <InputLabel
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  paddingTop: "10px",
                  paddingLeft: "5px",
                }}
              >

                Contact Me By:
              </InputLabel>
              <Select
                value={formData.contact_method}
                name="contact_method"
                sx={{
                  background: "white",
                  margin: "1rem auto",
                  width: "150px",
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
