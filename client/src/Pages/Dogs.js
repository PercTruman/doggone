import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import SeenDogGallery from '../Components/SeenDogGallery';
import MissingDogGallery from '../Components/MissingDogGallery';

function SeenDogs() {
	const [showMissingDogs, setShowMissingDogs] = useState(false);
	const { loggedIn } = useContext(UserContext);
	const [dogsLoaded, setDogsLoaded] = useState(false);
	const [imageGallery, setImageGallery] = useState(null);
	const fullDogObjects =
		imageGallery &&
		imageGallery.data.filter((dog) => (dog.attributes.image_url ? dog : null));
	useEffect(() => {
		getDogs();
	}, []);

	function getDogs() {
		fetch('/dogs')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setImageGallery(data);
				setDogsLoaded(true);
			});
	}

	function toggleShowMissingDogs() {
		setShowMissingDogs(!showMissingDogs);
	}

	function claimDog(id) {
		loggedIn
			? fetch(`/dogs/${id}`, {
					method: 'DELETE',
			  }).then((res) => {
					if (res.ok) {
						res.json().then(getDogs());
						alert(
							'Dog was successfully claimed, and will be removed from the gallery.'
						);
					} else {
						res.json().then((errors) => alert(errors.error));
					}
			  })
			: alert('You cannot claim this dog without an account.');
	}

	return showMissingDogs ? (
		<MissingDogGallery
			toggleShowMissingDogs={toggleShowMissingDogs}
			loggedIn={loggedIn}
			claimDog={claimDog}
			getDogs={getDogs}
			imageGallery={imageGallery}
			dogsLoaded={dogsLoaded}
			fullDogObjects={fullDogObjects}
		/>
	) : (
		<SeenDogGallery
			toggleShowMissingDogs={toggleShowMissingDogs}
			loggedIn={loggedIn}
			claimDog={claimDog}
			getDogs={getDogs}
			imageGallery={imageGallery}
			setImageGallery={setImageGallery}
			dogsLoaded={dogsLoaded}
			fullDogObjects={fullDogObjects}
		/>
	);
}
export default SeenDogs;
