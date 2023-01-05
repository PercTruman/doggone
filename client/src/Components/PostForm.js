import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Posts from '../Pages/Posts';

function PostForm({ setShowPostForm , setPosts, posts}) {
	const { user } = useContext(UserContext);
	const [postFormData, setPostFormData] = useState({
		subject: '',
		content: '',
		author: '',
	});
	const handleChange = (e) => {
		setPostFormData({
			...postFormData,
			[e.target.name]: e.target.value,
			author: user.username,
			user_id:user.id
		});
	};
console.log(user.username)
	function handleSubmit(e) {
		e.preventDefault();

		fetch('/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postFormData),
		}).then((res) => {
			if (res.ok) {
				res.json().then((newPost) => {
					alert(
						'Thank you for submitting.  Your message has been saved successfully.'
					);
						setPosts([...posts, newPost])
					setPostFormData({
						subject: '',
						content: '',
						author: ''
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
