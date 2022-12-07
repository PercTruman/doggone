import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
import Welcome from './Pages/Welcome';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import DogDetail from './Pages/DogDetail';
import DogRegistration from './Pages/DogRegistration';
import NewSighting from './Pages/NewSighting';
import RegisteredDogGallery from './Pages/RegisteredDogGallery';
import SeenDogs from './Pages/SeenDogs';
import Sightings from './Pages/Sightings';
import LostDog from './LostDog.jpg';


function App() {
  const styles ={
    fullOpacity:{
      backgroundImage: `url(${LostDog})`,
      height: "100%",
      width: "100%",
      backgroundSize: "cover"
    },
    transparent:{
      backgroundImage: `url(${LostDog})`,
      backgroundColor: "rgba(0,0,0,0.5)",
      height: "100%",
      width: "100%",
      backgroundSize: "cover"
    }
  }
  return (
    <div className="App"
    style={styles.fullOpacity}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/-login" element={<Login />} />
          <Route path="/-signup" element={<Signup />} />
          <Route path="/-sightings" element={<Sightings />} />
          <Route path="/-seen_dogs" element={<SeenDogs />} />
          <Route path="/-registered_dogs" element={<RegisteredDogGallery />} />
          <Route path="/-new_sighting" element={<NewSighting />} />
          <Route path="/-dog_registration" element={<DogRegistration />} />
          <Route path="/-registered_dogs/:id" element={<DogDetail />} />
          <Route path="/-seen_dogs/:id" element={<DogDetail />} />
        </Routes>
    </div>
  );
}

export default App;
