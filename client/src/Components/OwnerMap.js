import React, { useState, useMemo, useCallback, useRef } from 'react';

import {
	useLoadScript,
	GoogleMap,
	MarkerF,
	InfoWindowF,
} from '@react-google-maps/api';

import dogPaw from '../Pages/dog-paw.svg';

const mapContainerStyle = {
	margin: '0 auto',
	width: '60vw',
	height: '40vh',
};

const options = {
	disableDefaultUI: true,
	zoomControl: true,
};

function OwnerMap({ sightingsArray }) {
	const [selected, setSelected] = useState(null);
	const [showContactInfo, setShowContactInfo] = useState(false);
	const center = useMemo(() => ({ lat: 32.59048, lng: -97.04098 }), []);
	const mapRef = useRef();
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	function compareSightingTimes(a, b) {
		return a - b;
	}

	console.log(sightingsArray);

	const sortedSightingsArray = sightingsArray.sort(compareSightingTimes);
	const markers =
		window.google &&
		sightingsArray.map((sighting) => {
			const date = new Date(sighting.created_at).toLocaleString();
			return (
				<div key={sighting.id}>
					<MarkerF
						position={{
							lat: Number(sighting.lat),
							lng: Number(sighting.lng),
						}}
						icon={{
							url: dogPaw,
							scaledSize: new window.google.maps.Size(20, 20),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 15),
						}}
					/>
					<InfoWindowF
						options={{
							pixelOffset: new window.google.maps.Size(0, -15),
						}}
						maxWidth={50}
						position={{
							lat: Number(sighting.lat),
							lng: Number(sighting.lng),
						}}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<div style={{ maxHeight: '100px', maxWidth: '75px' }}>
							<h3 style={{ color: 'red' }}>
								{sortedSightingsArray.indexOf(sighting) + 1}
							</h3>
							<p>Seen at: {date}</p>
							{sighting.contact_method ? (
								<div style={{ fontWeight: 'bold' }}>
									{' '}
									{sighting.contact_method}:
									<br />
									blah
								</div>
							) : null}
						</div>
					</InfoWindowF>{' '}
					{showContactInfo ? (
						<InfoWindowF
							options={{
								pixelOffset: new window.google.maps.Size(
									0,
									-15
								),
							}}
							maxWidth={50}
							position={{
								lat: Number(sighting.lat),
								lng: Number(sighting.lng),
							}}
							onCloseClick={() => {
								setSelected(null);
							}}
						>
							<div
								style={{ maxHeight: '100px', maxWidth: '75px' }}
							>
								<h3 style={{ color: 'red' }}>
									{sighting.contact_method}
								</h3>
							</div>
						</InfoWindowF>
					) : null}
				</div>
			);
		});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		window.google && (
			<div>
				<div style={{ paddingTop: '3rem' }}>
					{/* <h2 style={{ color: "#85BBCC" }}>Sightings for this dog:</h2> */}
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={16}
						center={center}
						onLoad={onMapLoad}
						options={options}
					>
						{markers ? markers : null}
					</GoogleMap>
					{/* <Button
        variant="contained"
        onClick={() => setShowOwnerMap((showOwnerMap) => !showOwnerMap)}
        sx={{ height: "45px", marginTop: "2.5rem" }}
      >
        Back to Details
      </Button> */}
				</div>
			</div>
		)
	);
}

export default OwnerMap;
