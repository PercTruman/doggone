import React from 'react'


function Locate({panTo}) {
  return (
    <div>
    <button className='locate' onClick = {()=> {
        navigator.geolocation.getCurrentPosition((position)=>{ panTo({lat: position.coords.latitude,
        lng: position.coords.longitude})}, ()=>null);
    }}>
        <img src="./public/compass.svg" alt="compass - locate me"/>
    </button>
    </div>
  )
}

export default Locate