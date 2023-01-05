import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Box } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import OwnerMap from '../Components/OwnerMap';
import UpdatePhotoDialog from '../Components/UpdatePhotoDialog';

function DogDetail() {
	const { id } = useParams();
	const [showOwnerMap, setShowOwnerMap] = useState(false);
	const [dogDetails, setDogDetails] = useState(null);
	const [sightingsArray, setSightingsArray] = useState([]);
	useEffect(() => {
		getDogDetails();
	}, []);

	function getDogDetails() {
		fetch(`/dogs/${id}`)
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
							contact_info: data.sightings[i].contact_info,
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
					owner_id: data.owner_id
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
					style={{ color: '#85BBCC' , paddingBottom: '2rem' }}
				>
					{' '}
					Dog Details
				</Typography>
				<UpdatePhotoDialog id={id} dogDetails={dogDetails}setDogDetails={setDogDetails}/>
			</Grid2>
			<Grid2 container>
				{dogDetails && (
					<Box
						sx={{
							display: 'flex',
							border: '2px solid #85BBCC',
							// border: '2px solid red',
							margin: '0 auto',
						}}
					>
						<img
							style={{ width: '150px', height: '150px' }}
							src={dogDetails.picture}
							alt={'specific dog picture'}
							//
						/>
						<Box
							style={{
								paddingTop: '1rem',
								backgroundColor: 'darkGray',
								border: '2px solid black',
							}}
						>
							<Typography
								sx={{ padding: '.5rem', fontSize: '14px' }}
							>
								Breed: {dogDetails.breed}
							</Typography>
							<Typography
								sx={{ padding: '.5rem', fontSize: '14px' }}
							>
								Age Range: {dogDetails.age.toLowerCase()}
							</Typography>
							<Typography
								sx={{ padding: '.5rem', fontSize: '14px' }}
							>
								Sex: {dogDetails.sex.toLowerCase()}
							</Typography>
						</Box>
					</Box>
				)}
			</Grid2>

			<OwnerMap
				setShowOwnerMap={setShowOwnerMap}
				showOwnerMap={showOwnerMap}
				sightingsArray={sightingsArray}
				dogDetails={dogDetails}
			/>
		</Box>
	);
}

export default DogDetail;
