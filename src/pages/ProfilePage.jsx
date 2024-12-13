import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import ProfileGrid from '../components/ProfileGrid';
import { useDispatch } from 'react-redux';
import { fetchProfilePosts } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ProfilePage = () => {
	const user = JSON.parse(localStorage.getItem('vibesnapUser')) || useSelector((state) => state.auth.user);
	const {posts} = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchProfilePosts());
	}, [])

	const navigateBack = () => {
		navigate("/");
	}

  return (
    <div>
		<Button onClick={navigateBack} startIcon={<ArrowBackIosNewIcon />} color='apple-black' variant='text'>back</Button>
		<img src={user?.coverImage} alt={"cover image"} style={{
			backgroundImage: "linear-gradient(135deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
			height: "200px",
			width: "100%",
		}}/>
		<Avatar sx={{
			width: 120,
			height: 120,
			top: -60,
		}} alt={user?.username} src={user?.avatar} className='ml-4 border-4 border-white'/>
		<div className='m-4 -mt-10'>
			<h2>{user.username}</h2>
			<p>{user.bio || "No Bio"}</p>
			<h3 className='my-4'>My posts</h3>
			{posts.length < 1 ?
				<div>No posts published!</div> :
					<ProfileGrid items={posts}/>
			}
		</div>

    </div>
  )
}

export default ProfilePage
