import React, { useState, useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoIcon from '@mui/icons-material/Photo';
import IconButton from '@mui/material/IconButton';
import { Input, Typography } from '@mui/material';

export default function UpdatePhotoDialog({}) {
	const [open, setOpen] = useState(false);
	const [photoFormData, setPhotoFormData] = useState({
		image: null,
	});
	const { id } = useParams();

	const navigate = useNavigate();
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		buildDogImage(e);
	};

	function buildDogImage(e) {
		const photoData = new FormData();
		photoData.append('lost_dog[image]', e.target.image.files[0]);
		sendPhoto(photoData);
	}

	function sendPhoto(data) {
		fetch('/lost_dogs', {
			method: 'POST',
			body: data,
		})
			.then((res) =>
				res.json().then((data) => {
					// setLostDog(data);
				})
			)
			.catch((err) => console.error(err));
	}

	const handleChange = (e) => {
		setPhotoFormData({
			...photoFormData,
			[e.target.name]: e.target.value,
			//   user_id: user.id,
		});
	};

	return (
		<div>
			<Button sx={{position:'absolute',left:'15px', top:'10px', width:'50px', fontSize:'10px', letterSpacing:'1.5px' }} variant='contained' onClick={handleClickOpen}>
				Update Photo
			</Button>
			<Dialog open={open} onClose={handleClose}>
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
			</Dialog>
		</div>
	);
}
