import { IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const FloatingActionButton = ({handleClick}) => {
  return (
    <Tooltip title="add new post">
        <IconButton onClick={handleClick} size='large' sx={{
			backgroundImage: "linear-gradient(135deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
			// background: "rgb(131,58,180)",
            position: "fixed", // Ensures it stays fixed
            bottom: 32,       // Position it 32px from the bottom
            right: 32,
			height: 56,
			width: 56,
			boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
			border: "3px solid white"
        }}>
            <AddIcon color='white'/>
        </IconButton>
    </Tooltip>
  )
}

export default FloatingActionButton
