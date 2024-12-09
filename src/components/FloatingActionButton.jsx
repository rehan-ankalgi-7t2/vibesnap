import { IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const FloatingActionButton = ({handleClick}) => {
  return (
    <Tooltip title="add new post">
        <IconButton onClick={handleClick} size='large' sx={{
            backgroundColor: "black", 
            position: "fixed", // Ensures it stays fixed
            bottom: 32,       // Position it 32px from the bottom
            right: 32,
        }}>
            <AddIcon color='white'/>
        </IconButton>
    </Tooltip>
  )
}

export default FloatingActionButton
