import React, {useState} from 'react';
import Navbar from '../Components/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PostForm from '../Components/PostForm';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	width: '600px',
}));

function Posts() {
    const [showPostForm, setShowPostForm] = useState(false)
    function handleClick(){
        setShowPostForm(!showPostForm)

    }
	return (
		<Box>
			<Navbar />
		
				<h2
					style={{
                        fontSize: '48px',
						marginTop: '1rem',
						paddingBottom: '0',
						marginBottom: '1rem',
						color: '#85BBCC',
					}}
				>
					Message Board
				</h2>
                <Button  onClick={handleClick} variant='contained' sx={{ backgroundColor: '#F6E89D', color: 'black' }}>Create New Message</Button>
                {showPostForm ?  <PostForm />:
			<Box
				sx={{
					paddingTop: '3rem',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Stack spacing={2}>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
					<Item>Item 3</Item>
				</Stack>
			</Box>}
		</Box>
	);
}

export default Posts;
