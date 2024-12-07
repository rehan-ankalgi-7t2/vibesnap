import { Button } from '@mui/material'
import React from 'react'

const Notfound = () => {
  return (
    <div className='w-full h-100 flex items-center justify-center flex-col'>
      <h1>404</h1>
      <h2>the page you are looking for doesn't exist</h2>
      <Button>Go to Home Page</Button>
    </div>
  )
}

export default Notfound
