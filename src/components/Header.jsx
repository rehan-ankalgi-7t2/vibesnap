import { Avatar, Button, Divider } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/auth/authSlice';

const Header = () => {
	const user = JSON.parse(localStorage.getItem('vibesnapUser')) || useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogOut = () => {
		dispatch(logOut())
		navigate("/login")
	}
  return (
    <header className='w-[100%] h-[100px] flex flex-row items-center justify-between gap-4 px-4 border-b-2'>
		  <div className='flex flex-row items-center justify-start gap-4'>
			<Link to={"/profile"}>
			<Avatar sx={{
				width: 56,
				height: 56,
			}} alt={user?.username} src={user?.avatar} />
			</Link>
		<div>
			<span>Welcome back</span>
			<h3>{user?.first_name}</h3>
		</div>
		</div>
		<Button variant='outlined' onClick={handleLogOut}>Log out</Button>
    </header>
  )
}

export default Header
