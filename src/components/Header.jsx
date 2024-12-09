import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const user = useSelector((state) => state.user);

  return (
    <header className='w-[100%] h-[100px] flex flex-row items-center justify-start gap-4 bg-red-200 px-4'>
          <Avatar sx={{
            width: 56,
            height: 56,
          }} alt={user?.username} src={user?.avatar} />
      <div>
        <span>Welcome back</span>
        <h3>{user?.username}</h3>
      </div>
    </header>
  )
}

export default Header
