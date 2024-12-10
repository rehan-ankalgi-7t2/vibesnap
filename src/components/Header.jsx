import { Avatar, Divider } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const {user} = useSelector((state) => state.auth);

  return (
    <header className='w-[100%] h-[100px] flex flex-row items-center justify-start gap-4 px-4 border-b-2'>
          <Avatar sx={{
            width: 56,
            height: 56,
          }} alt={user?.username} src={user?.avatar} />
      <div>
        <span>Welcome back</span>
        <h3>{user?.first_name}</h3>
      </div>
    </header>
  )
}

export default Header
