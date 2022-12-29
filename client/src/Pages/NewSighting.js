import React, { useContext, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import FinderMap from '../Components/FinderMap';
import FinderForm from '../Components/FinderForm';
import Box from '@mui/material/Box';
import Navbar from '../Components/Navbar';

function NewSighting() {
	const location = useLocation();
	const dogId = location.state;
	const { user } = useContext(UserContext);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [showMap, setShowMap] = useState(true);
	const mapRef = useRef();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		color: '',
		sex: '',
		breed: '',
		age_group: '',
		additional_details: '',
		latitude: null,
		longitude: null,
		contact_method: '',
		contact_info: '',
		time_of_sighting: '',
		date_of_sighting: '',
		finder_id: user && user.id,
		owner_id: '',
	});

	console.log(formData);
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
		>
			<Navbar />
			<Box sx={{ textAlign: 'center', fontSize: '30px' }}>
				<h3
					style={{
						marginTop: '1rem',
						paddingBottom: '0',
						marginBottom: '0',
						color: '#85BBCC',
					}}
				>
					Create New Sighting
				</h3>
			</Box>
			{showMap ? (
				<Box>
					<FinderMap
						dogId={dogId}
						setShowMap={setShowMap}
						setFormData={setFormData}
						formData={formData}
						mapRef={mapRef}
					/>
				</Box>
			) : null}
			<Box display={'flex'} justifyContent={'space-around'}>
				<Box display={'flex'} justifyContent={'space-around'}>
					<Box padding={'4rem'} marginRight={'6rem'}>
						<FinderForm
							id={id}
							latitude={latitude}
							longitude={longitude}
							formData={formData}
							setFormData={setFormData}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default NewSighting;
