import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PetsIcon from '@mui/icons-material/Pets';

function SeenDogGallery({
	toggleShowMissingDogs,
	claimDog,
    fullDogObjects,
	dogsLoaded,
	
}) {
	const navigate = useNavigate();

	const actions = dogsLoaded
		? [
				{
					icon: <VisibilityIcon />,
					name: 'Add sighting for this dog ',
				},
				{ icon: <InfoIcon />, name: 'View dog details' },
				{ icon: <PetsIcon />, name: 'Claim this dog' },
		  ]
		: { icon: <VisibilityIcon />, name: 'Add sighting for this dog ' };

	return (
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
													} else if (action.name === 'View dog details') {
														navigate(`/-dogs/${dogObject.id}`);
													} else if (action.name === 'Claim this dog') {
														claimDog(dogObject.id);
													}
												}}
											/>
										))}
									</SpeedDial>
								</ImageListItem>
							))}
				</ImageList>
			</Grid>
		</Box>
	);
}

export default SeenDogGallery;
