import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function UpdatePhotoDialog({ id, dogDetails, setDogDetails }) {
	const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
	const navigate = useNavigate();
	const handleClickOpen = () => {
		setOpen(true);
	};

    useEffect(()=>{
        if (selectedImage){
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage])


	function buildDogImage(e) {
        setSelectedImage(e.target.files[0])
		const photoData = new FormData();
		photoData.append('lost_dog[image]', e.target.files[0]);
		sendPhoto(photoData);
	}

	function sendPhoto(data) {
		fetch(`/dogs/${id}`, {
			method: 'PATCH',
			body: data,
		})
			.then((res) =>
				res.json().then((data) => {
					setDogDetails({ ...dogDetails, picture: data.image_url });
                    alert('Dog image was successfully updated!')
					navigate('/-dogs');
				})
			)
			.catch((err) => console.error(err));
	}

	return (
		<div>
            <input accept='image' type='file' id='select-image'style={{display: 'none'}} onChange={e=>buildDogImage(e)}/>
            <label htmlFor='select-image'>
			<Button
				sx={{ marginBottom: '2rem' }}
				variant='contained'
				onClick={handleClickOpen}
                component='span'
			>
				Update Photo
			</Button>
            </label>
		</div>
	);
}
