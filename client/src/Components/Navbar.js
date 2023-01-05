import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
	// const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	// const handleOpenNavMenu = (event) => {
	// 	setAnchorElNav(event.currentTarget);
	// };
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	// const handleCloseNavMenu = () => {
	// 	setAnchorElNav(null);
	// };

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const theme = useTheme();

	const { user, logout, loggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	const logoutUser = () => {
		fetch('/logout', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			logout();
			navigate('/');
		});
	};
	if (loggedIn) {
		return (
			<div>
				<AppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar color={theme.palette.primary.light}>
							<Box
								sx={{
									flexGrow: 1,
									display: { xs: 'none', md: 'flex' },
								}}
							>
								<Button
									onClick={() => navigate('/')}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Home
								</Button>
								<Button
									onClick={() => navigate('/-new_sighting')}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Create Sighting
								</Button>

								<Button
									onClick={() => navigate('/-dogs')}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									Dogs Gallery
								</Button>
								{loggedIn && (
									<>
										<Button
											onClick={() => navigate('/-posts')}
											sx={{
												my: 2,
												color: 'white',
												display: 'block',
											}}
										>
											Message Board
										</Button>
										<Button
											onClick={() => navigate('/-missing_dog')}
											sx={{
												fontWeight: 'bold',
												my: 2,
												color: 'red',
												display: 'block',
											}}
										>
											Report My Dog
										</Button>
									</>
								)}
							</Box>
							<h3>Hello {user.username}</h3>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt='Remy Sharp' />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem onClick={logoutUser}>
										<Typography textAlign='center'>Logout</Typography>
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
				<AppBar position='static'>
					<Toolbar color={theme.palette.primary.light}>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
							}}
						>
							<Button
								onClick={() => navigate('/')}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
								}}
							>
								Home
							</Button>
							<Button variant='text' sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}onClick={() => navigate('/-login')}>
								Login
							</Button>
							<Button variant='text' sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}onClick={() => navigate('/-signup')}>
								Signup
							</Button>
						</Box>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
};

export default Navbar;
