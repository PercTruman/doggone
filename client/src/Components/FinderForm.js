import React, {useState, useContext} from 'react'
import { UserContext } from "../UserContext";


import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function FinderForm() {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
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
    
      const ageChoices = ["Baby", "Puppy", "Adult", "Mature"];
      const ageDropDownOptions = ageChoices.map((choice) => {
        <MenuItem key={choice} type="text" name={choice} value={choice}>
          {choice}
        </MenuItem>;
      });
    
      const contacts = ["Text Message", "Phone", "Email", "No Contact"]
      const contactOptions = contacts.map((choice) => {
        <MenuItem key={choice} type="text" name={choice} value={choice}>{choice}</MenuItem>})
  return (
    <Box>FinderForm
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginTop: "3rem", marginLeft: "2rem" }}>
            Create New Class
          </h2>
          <Grid xs>
            <TextField
              label="Color:"
              size="small"
              id="outlined-basic"
              variant="outlined"
              name="color"
              type="text"
              autoComplete="on"
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              label="Sex, if known:"
              size="small"
              id="outlined-basic"
              variant="outlined"
              name="sex"
              type="text"
              autoComplete="on"
              value={formData.sex}
              onChange={handleChange}
            />
            <TextField
              label="Breed, if known:"
              size="small"
              id="outlined-basic"
              variant="outlined"
              name="breed"
              type="text"
              autoComplete="on"
              value={formData.breed}
              onChange={handleChange}
            />
            <FormControl fullWidth sx={{ mb: "1em" }}>
              <InputLabel> Approximate Age</InputLabel>
              <Select
                value={formData.age_group}
                name="age_group"
                onChange={handleChange}
              >
                {ageDropDownOptions}
              </Select>
            </FormControl>
            <TextField
              label="Additional Details:"
              multiline
              size="small"
              id="outlined-basic"
              variant="outlined"
              name="additional_details"
              type="text"
              autoComplete="on"
              value={formData.additional_details}
              onChange={handleChange}
            />
          </Grid>
          <FormControl fullWidth sx={{ mb: "1em" }}>
              <InputLabel> Contact Me By:</InputLabel>
              <Select
                value={formData.contact_method}
                name="contact_method"
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
    </Box>
  )
}

export default FinderForm