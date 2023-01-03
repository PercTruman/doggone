import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((dog_owner) => {
          login(dog_owner);
          navigate("/-seen_dogs");
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  return (
    <div>
      <Grid sx={{ display:'flex', width: '30%', margin:'0 auto',justifyContent: "center", paddingTop:'3rem' }} >
        <form onSubmit={handleSubmit}>
          <Typography  variant='h4'sx={{  paddingBottom:'2rem', color:"#76B5C5"}}>Login</Typography>
          <TextField
            sx={{ marginBottom: "2rem", background:'white' }}
            size="small"
            label="Username"
            name="username"
            type="text"
            autoComplete="on"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <TextField
           sx={{ marginBottom: "2rem", background:'white' }}
            label="Password"
            size="small"
            name="password"
            type="password"
            autoComplete="on"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <Grid container sx={{display:'flex', justifyContent:'space-between'}}>
          <Button
            type="submit"
            sx={{ marginTop: "2rem" }}
            variant="contained"
          >
            Log In
          </Button>
          <Button
            sx={{  marginTop: "2rem" }}
            variant="contained"
            onClick={() => navigate("/-signup")}
          >
            Signup
          </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Login;
