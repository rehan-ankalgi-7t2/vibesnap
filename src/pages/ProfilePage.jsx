import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../features/user/userActions';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const ProfilePage = () => {
	const user = JSON.parse(localStorage.getItem('vibesnapUser')) || useSelector((state) => state.auth.user);

  return (
    <div>
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
		</div>

    </div>
  )
}

export default ProfilePage
