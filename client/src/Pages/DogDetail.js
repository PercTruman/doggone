import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Box } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import OwnerMap from '../Components/OwnerMap';
import Button from '@mui/material/Button';

function DogDetail() {
	const { id } = useParams();
	const [showOwnerMap, setShowOwnerMap] = useState(false);
	const [dogDetails, setDogDetails] = useState(null);
	const [sightingsArray, setSightingsArray] = useState([]);
	useEffect(() => {
		getDogDetails();
	}, []);

	function getDogDetails() {
		fetch(`/seen_dogs/${id}`)
			.then((res) => res.json())
			.then((data) => {
				buildMarkerObjects(data);

				function buildMarkerObjects(data) {
					const arr = [];
					for (let i = 0; i < data.sightings.length; i++) {
						arr[i] = {
							id: data.sightings[i].id,
							lat: data.sightings[i].latitude,
							lng: data.sightings[i].longitude,
							contact_method: data.sightings[i].contact_method,
							created_at: data.sightings[i].created_at,
						};
						setSightingsArray(arr);
					}
				}

				setDogDetails({
					picture: data.image_url,
					age: data.age_group,
					sex: data.sex,
					breed: data.breed,
					color: data.color,
				});
			});
	}

	if (!dogDetails) return null;

	return (
		<Box>
			<Navbar />
			<Grid2
				container
				spacing={0}
				direction='column'
				alignItems={'center'}
				justifyContent={'center'}
				style={{ minHeight: '10vh' }}
				paddingTop={'1rem'}
			>
				<Typography
					variant='h4'
					align='center'
					style={{ color: '#85BBCC' }}
				>
					{' '}
					Dog Sightings
				</Typography>
			</Grid2>
			<Grid2 container>
				{dogDetails && (
					<Box
						sx={{
							display: 'flex',
							margin: '0 auto',
						}}
					>
						<img
							style={{ width: '300px', height: '200px' }}
							src={dogDetails.picture}
							alt={'specific dog picture'}
						/>
						<Typography style={{ fontWeight: 'bold' }}>
							Breed: {dogDetails.breed}
						</Typography>
						<Typography style={{ fontWeight: 'bold' }}>
							Age Range: {dogDetails.age.toLowerCase()}
						</Typography>
						<Typography style={{ fontWeight: 'bold' }}>
							Sex: {dogDetails.sex.toLowerCase()}
						</Typography>
						<OwnerMap
							setShowOwnerMap={setShowOwnerMap}
							showOwnerMap={showOwnerMap}
							sightingsArray={sightingsArray}
							dogDetails={dogDetails}
						/>
					</Box>
				)}
			</Grid2>
		</Box>
	);
}

export default DogDetail;
