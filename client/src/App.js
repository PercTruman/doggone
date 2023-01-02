import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import DogDetail from './Pages/DogDetail';
import NewSighting from './Pages/NewSighting';
import Dogs from './Pages/Dogs';
import Sightings from './Pages/Sightings';
import LostDog from './LostDog.jpg';
import Posts from './Pages/Posts';
import MissingDog from './Pages/MissingDog';

function App() {
	const styles = {
		fullOpacity: {
			backgroundImage: `url(${LostDog})`,
			height: '100vh',
			width: '100vw',
			backgroundSize: 'cover',
		},
		transparent: {
			backgroundImage: `url(${LostDog})`,
			backgroundColor: 'rgba(0,0,0,0.5)',
			height: '100vh',
			width: '100vw',
			backgroundSize: 'cover',
		},
	};
	return (
		<div className='App' style={styles.fullOpacity}>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/-login' element={<Login />} />
				<Route path='/-signup' element={<Signup />} />
				<Route path='/-sightings' element={<Sightings />} />
				<Route path='/-dogs' element={<Dogs />} />
				<Route path='/-new_sighting' element={<NewSighting />} />
				<Route path='/-new_sighting/:id' element={<NewSighting />} />
				<Route path='/-dogs/:id' element={<DogDetail />} />
				<Route path='/-missing_dog' element={<MissingDog />} />
				<Route path='/-posts' element={<Posts />} />
			</Routes>
		</div>
	);
}

export default App;
