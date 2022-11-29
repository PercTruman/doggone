import React from 'react';
import compass from "../Pages/Compass.jpg";

function Locate({panTo}) {
  return (
    <div>
    <button className='locate' onClick = {()=> {
        navigator.geolocation.getCurrentPosition((position)=>{ panTo({lat: position.coords.latitude,
        lng: position.coords.longitude})}, ()=>null);
    }}>
        <img src={compass} alt="compass - locate me"style={{opacity:.75}}/>
        <p>Locate Me</p>
    </button>
    </div>
  )
}

export default Locate