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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { borderRadius } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightgray',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	width: '600px',
}));

function Posts() {
	const { user, loggedIn } = useContext(UserContext);
	const [showPostForm, setShowPostForm] = useState(false);
	const [posts, setPosts] = useState([]);

	function handleShowPostForm() {
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

	function handleClick(id) {
		loggedIn
			? fetch(`/posts/${id}`, {
					method: 'DELETE',
			  }).then((res) => {
					if (res.ok) {
						getPosts();
						alert('Post has been deleted successfully.');
					} else {
						res.json().then((errors) => alert(errors.error));
					}
			  })
			: alert('You cannot delete posts without an account.');
	}

	const postDisplay =
		posts &&
		user &&
		posts
			.sort((a, b) => b.id - a.id)
			.map((post) => {
				const date = new Date(post.created_at).toLocaleString();
				return (
					<Box>
						<ImageListItem key={post.id} sx={{ padding: '10px' }}>
							<Typography variant='caption'>
								{date} by:{' '}
								<span
									style={{
										fontWeight: 'bold',
										color: '#85BBCC',
										height: '50px',
									}}
								>
									{post.author}
								</span>
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								Subject: {post.subject}
							</Typography>
							<Typography>{post.content}</Typography>
							<Button
								onClick={() => handleClick(post.id)}
								variant='contained'
								size='small'
								sx={{ width: '60px', margin: '0 auto', fontSize: '8px' }}
								color='primary'
							>
								Delete
							</Button>
						</ImageListItem>
						<hr style={{ backgroundColor: 'black' }}></hr>
					</Box>
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
				onClick={handleShowPostForm}
				variant='contained'
				sx={{ backgroundColor: '#F6E89D', color: 'black' }}
			>
				{showPostForm ? 'Cancel' : 'Create New Message'}
			</Button>
			{showPostForm ? (
				<PostForm
					setShowPostForm={setShowPostForm}
					posts={posts}
					setPosts={setPosts}
				/>
			) : (
				<Box
					sx={{
						paddingTop: '3rem',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<ImageList
						gap={10}
						sx={{
							paddingTop: '1rem',
							width: '50vw',
							height: '60vh',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}
						cols={1}
					>
						{postDisplay}
					</ImageList>
				</Box>
			)}
		</Box>
	);
}

export default Posts;
