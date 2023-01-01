import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import Navbar from '../Components/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PostForm from '../Components/PostForm';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightgray',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	width: '600px',
}));

function Posts() {
	const { user } = useContext(UserContext);
	const [showPostForm, setShowPostForm] = useState(false);
	const [posts, setPosts] = useState([]);

	function handleClick() {
		setShowPostForm(!showPostForm);
	}

	useEffect(() => {
		getPosts();
	}, []);

	function getPosts() {
		fetch('/posts')
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			});
	}
	console.log(posts);
	const postDisplay =
		posts &&
		user &&
		posts
			.sort((a, b) => b.id - a.id)
			.map((post) => {
				const date = new Date(post.created_at).toLocaleString();
				return (
					<Item key={post.id}>
						<Typography variant='caption'>
							{date} by:{' '}
							<span
								style={{ fontWeight: 'bold', color: '#85BBCC' }}
							>
								{user.username}
							</span>
						</Typography>
						<Typography sx={{ fontWeight: 'bold' }}>
							Subject: {post.subject}
						</Typography>
						<Typography>{post.content}</Typography>
					</Item>
				);
			});

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
			<Button
				onClick={handleClick}
				variant='contained'
				sx={{ backgroundColor: '#F6E89D', color: 'black' }}
			>
				{showPostForm ? 'Cancel' : 'Create New Message'}
			</Button>
			{showPostForm ? (
				<PostForm setShowPostForm={setShowPostForm} posts={posts}setPosts={setPosts}/>
			) : (
				<Box
					sx={{
						paddingTop: '3rem',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Stack spacing={2}>{postDisplay}</Stack>
				</Box>
			)}
		</Box>
	);
}

export default Posts;
