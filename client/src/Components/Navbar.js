import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import {  useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();

  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  };
  if (loggedIn) {
    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar color={theme.palette.primary.light}>
              {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}> */}
                {/* <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                ></IconButton> */}
                {/* <Menu */}
                  {/* id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                > */}
                  {/* <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Add Teacher</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Add Student</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Create New Class</Typography>
                  </MenuItem> */}
                {/* </Menu> */}
              {/* </Box> */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

                <Button
                  onClick={() => navigate("/-new_sighting")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Create Sighting
                </Button>
               
                <Button
                  onClick={() => navigate("/-seen_dogs")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Seen Dogs
                </Button>
                <Button
                  onClick={() => navigate("/-posts")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Message Board
                </Button>
              </Box>
              <h3>Hello {user.username}</h3>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  
                    <MenuItem  onClick={logoutUser}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Sign In</h1>
     
          <Button variant="contained" onClick={() => navigate("/-login")}>Login</Button>
          <Button variant="contained" onClick={() => navigate("/-signup")}>Signup</Button>
       </div>
    );
  }
};

export default Navbar;
