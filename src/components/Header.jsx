import { Avatar, Divider } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Header = () => {
	const user = JSON.parse(localStorage.getItem('vibesnapUser')) || useSelector((state) => state.auth.user);

  return (
    <header className='w-[100%] h-[100px] flex flex-row items-center justify-start gap-4 px-4 border-b-2'>
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
    </header>
  )
}

export default Header
