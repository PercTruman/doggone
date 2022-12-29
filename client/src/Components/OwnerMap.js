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
	height: '50vh',
};

const options = {
	disableDefaultUI: true,
	zoomControl: true,
};

function OwnerMap({ sightingsArray }) {
	const [selected, setSelected] = useState(null);

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
					<div style={{ width: '200px', height: '200px' }}>
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
									{sortedSightingsArray.indexOf(sighting) + 1}
								</h3>
								<p>Seen at: {date}</p>
								{sighting.contact_method ? (
									<div style={{ fontWeight: 'bold' }}>
										{' '}
										{sighting.contact_method}:
										<br />
										<p>
											<span
												style={{ fontWeight: 'bold' }}
											>
												{sighting.contact_info}
											</span>
										</p>
									</div>
								) : null}
							</div>
						</InfoWindowF>
					</div>{' '}
				</div>
			);
		});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		window.google && (
			<div>
				<div style={{  paddingTop: '1rem' }}>
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={16}
						center={center}
						onLoad={onMapLoad}
						options={options}
					>
						{markers ? markers : null}
					</GoogleMap>
				</div>
			</div>
		)
	);
}

export default OwnerMap;
