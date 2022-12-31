import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
function PostForm() {
	const { user } = useContext(UserContext);
	const [postFormData, setPostFormData] = useState({
		author: '',
		subject: '',
		content: '',
	});
	const handleChange = (e) => {
		setPostFormData({
			...postFormData,
			[e.target.name]: e.target.value,
			author_id: user.id,
		});
	};

	function handleSubmit(e) {
		e.preventDefault();
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
				</Grid2>
			</form>
		</Box>
	);
}

export default PostForm;
