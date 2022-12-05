import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { UserContext } from "../UserContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid"


function FinderForm({latitude, longitude}) {
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds?page=0")
      .then((res) => res.json())
      .then((data) => setBreedNames(data));
  }, []);

  const { user } = useContext(UserContext);
  const [breedNames, setBreedNames] = useState([]);
 

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      finder_id: user.id,
    });
  };

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
     <Box>
      <Grid container flexDirection="column" justifyContent={"center"}>
        <Grid item>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: "1em" }}>
              <InputLabel  sx={{padding: "1rem 2rem"}}> Primary Color</InputLabel>
              <Select
                value={formData.color}
                name="color"
                sx={{ background: "white", margin: "1rem", maxWidth:"200px" }}
                onChange={handleChange}
              >
                {colorDropDownOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: "1em" }}>
              <InputLabel  sx={{padding: "1rem 2rem"}}>Sex, if known:</InputLabel>
              <Select
                value={formData.sex}
                name="sex"
                sx={{ background: "white", margin: "1rem", maxWidth:"200px" }}
                onChange={handleChange}
              >
                {sexDropDownOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: "1em" }}>
              <InputLabel sx={{padding: "1rem 2rem"}}>Breed, if known:</InputLabel>
              <Select
                value={formData.breed}
                name="breed"
                sx={{ background: "white", margin: "1rem" , maxWidth:"200px"}}
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
                sx={{ mb: "5em", mt:"1.75em", marginLeft: "-8rem", padding: "7px" }}
                variant="contained"
              >
                Breed Images
              </Button>
            </a>
            <FormControl fullWidth sx={{ mt: "-1.8em", mb: "1em" }}>
              <InputLabel  sx={{padding: "1rem 2rem"}}>Age Group</InputLabel>
              <Select
                value={formData.age_group}
                name="age_group"
                sx={{ background: "white", margin: "1rem", maxWidth:"200px" }}
                onChange={handleChange}
              >
                {ageDropDownOptions}
              </Select>
            </FormControl>
            <TextField
              label="Additional Details:"
              multiline
              size="medium"
              sx={{ background: "white", margin: "1rem", height: "10rem"}}
              id="outlined-basic"
              variant="filled"
              name="additional_details"
              type="text"
              value={formData.additional_details}
              onChange={handleChange}
            />
        
          <FormControl fullWidth sx={{ mb: "1em" }}>
            <InputLabel  sx={{padding: "1rem 2rem"}}> Contact Me By:</InputLabel>
            <Select
              value={formData.contact_method}
              name="contact_method"
              sx={{ background: "white", margin: "1rem", maxWidth:"200px" }}
              onChange={handleChange}
            >
              {contactOptions}
            </Select>
          </FormControl>
        
         
          <Button
            sx={{ mb: "5em", marginLeft: "4em", padding: "7px" }}
            variant="contained"
            type="submit"
          >
            Create Sighting
          </Button>
        </form>
        </Grid>
        </Grid>
      </Box>
  </Box>
  );
}

export default FinderForm;
