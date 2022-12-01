import React from "react";
import compass from "../Pages/Compass.jpg";

function Locate({ panTo }) {
  return (
    <div>
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }}
      >
        <img src={compass} alt="compass-locate me"  />
        <p style ={{color:"red", fontWeight:"bold"}}>Locate Me</p>
      </button>
    </div>
  );
}

export default Locate;
