import { Avatar } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <header className='w-[100%] h-[120px] flex flex-row items-center justify-start gap-4 bg-red-200 px-4'>
          <Avatar sx={{
            width: 56,
            height: 56,
          }} alt="Remy Sharp" src="https://cdn3d.iconscout.com/3d/premium/thumb/man-3d-icon-download-in-png-blend-fbx-gltf-file-formats--male-person-happy-people-human-avatar-pack-icons-7590876.png?f=webp" />
      <div>
        <span>Welcome back</span>
        <h3>User name</h3>
      </div>
    </header>
  )
}

export default Header
