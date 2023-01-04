import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Navbar from '../Components/Navbar';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PhotoIcon from '@mui/icons-material/Photo';
import PetsIcon from '@mui/icons-material/Pets';
import Button from '@mui/material/Button';
import UpdatePhotoDialog from '../Components/UpdatePhotoDialog';

const Input = styled('input')({
	display: 'none',
});

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function SeenDogs() {
	const [openDialog, setOpenDialog] = useState(false);
	const { loggedIn } = useContext(UserContext);
	const [imageGallery, setImageGallery] = useState(null);
	const [dogsLoaded, setDogsLoaded] = useState(false);
	const navigate = useNavigate();
	const [showMissingDogs, setShowMissingDogs] = useState(false);

	useEffect(() => {
		getDogs();
	}, []);

	function getDogs() {
		fetch('/lost_dogs')
			.then((res) => res.json())
			.then((data) => {
				setImageGallery(data);
				setDogsLoaded(true);
			});
	}
	const fullDogObjects =
		imageGallery &&
		imageGallery.data.filter((dog) => (dog.attributes.image_url ? dog : null));

	// const dogsWithSightings = fullDogObjects.filter(
	// 	(dog) => dog.attributes.sightings.length > 0
	// );

	const actions =
		loggedIn && dogsLoaded
			? [
					{
						icon: <VisibilityIcon />,
						name: 'Add sighting for this dog ',
					},
					{ icon: <InfoIcon />, name: 'View sightings for this dog' },
					{ icon: <PetsIcon />, name: 'Claim this dog' },
					
			  ]
			: { icon: <VisibilityIcon />, name: 'Add sighting for this dog ' };

	function toggleShowMissingDogs() {
		setShowMissingDogs(!showMissingDogs);
	}

	function claimDog(id) {
		fetch(`/lost_dogs/${id}`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				getDogs();
				alert(
					'Dog was successfully claimed, and will be removed from the gallery.'
				);
			} else {
				res.json().then((errors) => alert(errors.error));
			}
		});
	}

	function revDialog(id) {
		setOpenDialog(true);
	}

	return showMissingDogs ? (
		<div>
			<Navbar />
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems={'center'}
				justifyContent={'center'}
				style={{ minHeight: '10vh' }}
				paddingTop={'1rem'}
			>
				<Typography variant='h2' align='center' style={{ color: '#85BBCC' }}>
					Missing Dogs
				</Typography>
			</Grid>
			<Button
				onClick={() => toggleShowMissingDogs()}
				variant='contained'
				sx={{ backgroundColor: '#F6E89D', color: 'black' }}
			>
				Show Seen Dogs
			</Button>
			<br />
		
		
			<Grid container alignItems='center' justifyContent='center'>
				<ImageList
					gap={10}
					sx={{
						paddingTop: '1rem',
						width: '75vw',
						height: '60vh',
					}}
					cols={3}
				>
					{fullDogObjects &&
						fullDogObjects
							.filter(
								(dogObject) => dogObject.attributes.sightings.length === 0
							)
							.map((dogObject) => (
								<Box>
									<ImageListItem key={dogObject.id}>
									
										<img
											src={dogObject.attributes.image_url}
											loading='lazy'
											alt='doggy'
										/>{' '}
										<ImageListItemBar
											title={<span>{dogObject.attributes.breed}</span>}
											subtitle={
												<span
													style={{
														marginBottom: '1rem',
													}}
												>
													{' '}
													{dogObject.attributes.age_group}{' '}
												</span>
											}
										/>
										<SpeedDial
											ariaLabel='SpeedDial'
											direction='down'
											sx={{
												'& .MuiFab-primary': {
													width: 40,
													height: 40,
												},
												position: 'absolute',
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
													onClick={() => {
														if (action.name === 'Add sighting for this dog ') {
															navigate(`/-new_sighting/${dogObject.id}`, {
																state: dogObject.id,
															});
														} else if (
															action.name === 'View sightings for this dog'
														) {
															navigate(`/-dogs/${dogObject.id}`);
														} else if (action.name === 'Claim this dog') {
															claimDog(dogObject.id);
														} 
													}}
												/>
											))}
										</SpeedDial>
										<UpdatePhotoDialog />
									</ImageListItem>
								
								</Box>
								
							))}
				</ImageList>
			</Grid>
		</div>
	) : (
		<Box>
			<Navbar />

			<Grid
				container
				spacing={0}
				direction='column'
				alignItems={'center'}
				justifyContent={'center'}
				style={{ minHeight: '10vh' }}
				paddingTop={'1rem'}
			>
				<Typography variant='h2' align='center' style={{ color: '#85BBCC' }}>
					{' '}
					Seen Dogs
				</Typography>
			</Grid>
			<Button
				onClick={() => toggleShowMissingDogs()}
				variant='contained'
				sx={{ backgroundColor: '#F6E89D', color: 'black' }}
			>
				Show Missing Dogs
			</Button>
			<Grid container alignItems='center' justifyContent='center'>
				<ImageList
					gap={10}
					sx={{ paddingTop: '1rem', width: '75vw', height: '60vh' }}
					cols={3}
				>
					{fullDogObjects &&
						fullDogObjects
							.filter((dogObject) => dogObject.attributes.sightings.length > 0)
							.map((dogObject) => (
								<ImageListItem key={dogObject.id}>
									{' '}
									<img
										src={dogObject.attributes.image_url}
										loading='lazy'
										alt='doggy'
									/>{' '}
									<ImageListItemBar
										title={<span>{dogObject.attributes.breed}</span>}
										subtitle={
											<span style={{ marginBottom: '1rem' }}>
												{' '}
												{dogObject.attributes.age_group} <br />
												<br />
												<span
													style={{
														letterSpacing: '3px',
														fontSize: '18px',
														fontWeight: 'bold',
														color: 'red',
													}}
												>
													{dogObject.attributes.sightings.length} sighting(s)
												</span>
											</span>
										}
									/>
									<SpeedDial
										ariaLabel='SpeedDial'
										direction='down'
										sx={{
											'& .MuiFab-primary': {
												width: 40,
												height: 40,
											},
											position: 'absolute',
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
												onClick={() => {
													if (action.name === 'Add sighting for this dog ') {
														navigate(`/-new_sighting/${dogObject.id}`, {
															state: dogObject.id,
														});
													} else if (
														action.name === 'View sightings for this dog'
													) {
														navigate(`/-dogs/${dogObject.id}`);
													} else if (action.name === 'Claim this dog') {
														claimDog(dogObject.id);
													} 
												}}
											/>
										))}
									</SpeedDial>
								<UpdatePhotoDialog />
								</ImageListItem>
								
							))}
				</ImageList>
			</Grid>
		</Box>
	);
}
export default SeenDogs;
