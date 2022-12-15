import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar';

function SeenDogs() {
  const [imageGallery, setImageGallery] = useState([])
  useEffect(() => {
    fetch("/lost_dogs")
    .then((res) => res.json()).then((data) => {
  console.log(data)
      makeGallery(data)
      }, [])
  })

  function makeGallery(dogObjects) {
     const imageArray = dogObjects.data.map(dogObject =>
      (dogObject.attributes.image_url)).map(url =>
        <img src={url} alt="dog picture"/>)
// setImageGallery(imageArray)
  }

return (
  <div>
    <Navbar />
   {imageGallery}
</div>
)
}

export default SeenDogs;