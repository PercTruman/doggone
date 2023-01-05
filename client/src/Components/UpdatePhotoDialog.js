import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Input } from '@mui/material';
import { Box } from '@mui/system';

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

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		buildDogImage(e);
	};

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
					navigate('/-dogs');
				})
			)
			.catch((err) => console.error(err));
	}
console.log(selectedImage)
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
            {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
			{/* <Dialog open={open} onClose={handleClose}>
				<form onSubmit={(e) => handleSubmit(e, id)}>
					<DialogTitle>Update Photo</DialogTitle>
					<DialogContent sx={{ background: 'white' }}>
						<label htmlFor='icon-button-file'>
							<Input accept='image/*' id='icon-button-file' type='file' />
							<IconButton
								color='primary'
								aria-label='upload picture'
								component='span'
								onClick={handleClickOpen}
							>
								Update Photo
							</IconButton>
						</label>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit' id={id}>
							Upload Photo
						</Button>
					</DialogActions>
				</form>
			</Dialog> */}
		</div>
	);
}
