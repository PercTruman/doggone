import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function PostForm({ setShowPostForm }) {
	const { user } = useContext(UserContext);
	const [postFormData, setPostFormData] = useState({
		subject: '',
		content: '',
		author_id: '',
	});
	const handleChange = (e) => {
		setPostFormData({
			...postFormData,
			[e.target.name]: e.target.value,
			user_id: user.id,
		});
	};

	function handleSubmit(e) {
		e.preventDefault();

		fetch('/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postFormData),
		}).then((res) => {
			if (res.ok) {
				res.json().then(() => {
					alert(
						'Thank you for submitting.  Your message has been saved successfully.'
					);

					setPostFormData({
						subject: '',
						content: '',
					});
					setShowPostForm(false);
				});
			}
		});
	}
	return (
		<Box>
			<form onSubmit={handleSubmit}>
				<Grid2
					marginTop='3rem'
					container
					display={'flex'}
					direction={'column'}
					justifyContent='space-around'
				>
					<TextField
						placeholder='Subject'
						sx={{
							borderRadius: '5px',
							background: 'white',
							width: '400px',
							margin: '2rem auto',
						}}
						name='subject'
						type='text'
						value={postFormData.subject}
						onChange={handleChange}
					/>

					<TextField
						placeholder='Content'
						multiline
						sx={{
							borderRadius: '5px',
							background: 'white',
							width: '400px',
							margin: '2rem auto',
						}}
						name='content'
						type='text'
						value={postFormData.content}
						onChange={handleChange}
					/>
					<Button
						sx={{
							background: 'red',
							mb: '5em',
							margin: '1rem auto',
							padding: '7px',
						}}
						variant='contained'
						type='submit'
					>
						Create Post
					</Button>
				</Grid2>
			</form>
		</Box>
	);
}

export default PostForm;
