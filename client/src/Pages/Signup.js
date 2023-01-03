import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

const Signup = () => {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { signup, errorsList, setErrorsList } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        address: address,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/");
        } else {
          setUsername("");
          setEmail("");
          setAddress("")
          setPassword("");
          setPasswordConfirmation("");
          const errorLis = user.errors.map((e) => <li>{e}</li>);
          setErrorsList(errorLis);
        }
      });
  };

  return (
    <div>
      <Grid2 sx={{ display:'flex',justifyContent: "center" }} >
      <Grid2 >
      <h2 style={{color: '#76B5C5'}}>Account Signup</h2>
      <form onSubmit={handleSubmit}>
        <TextField
           sx={{marginBottom: "2rem", background:'white'}}
           size = "small"
           fullWidth
           label = "Username"
           name="username"
           type="text"
           autoComplete="on"
           id="username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
           sx={{marginBottom: "2rem",background:'white'}}
           fullWidth
           size = "small"
           label = "Email"
           name="email"
           type="email"
           autoComplete="on"
           id="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <TextField
           sx={{marginBottom: "2rem",background:'white'}}
           size = "small"
           fullWidth
           label = "Address"
           name="address"
           type="address"
           autoComplete="on"
           id="address"
           value={address}
           onChange={(e) => setAddress(e.target.value)}
        />{" "}
        <br />
        <TextField
            sx={{marginBottom: "2rem",background:'white'}}
           size = "small"
           fullWidth
           label = "Password"
           name="password"
           type="password"
           autoComplete="on"
           id="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      
        <TextField
            sx={{marginBottom: "2rem",background:'white'}}
           size = "small"
           fullWidth
           label = "Password Confirmation"
           name="Password Confirmation"
           type="password"
           autoComplete="on"
           id="passwordConfirmation"
           value={passwordConfirmation}
           onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <Grid2 container display='flex'justifyContent={'space-between'}>
        <Button variant="contained" type="submit" sx={{m: "2rem"}}>Create Account</Button>
        <Button variant="contained" sx={{m:'2rem'}}onClick={()=>navigate('/')}>Home Page</Button>
        </Grid2>
       
      </form>
      </Grid2>
      <ul>{errorsList}</ul>
      </Grid2>
    </div>
  );
};

export default Signup;
