import React, { useState } from 'react';
import { TextField, Chip, Box, Typography } from '@mui/material';

const MultiChipTextField = () => {
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isMaxHashtags, setIsMaxHastags] = useState(false);
    const MAX_HASHTAGS_COUNT = 10;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            if(chips.length >= MAX_HASHTAGS_COUNT){
                setIsMaxHastags(true)
                return
            }
            
            // Prevent duplicate entries
            if (!chips.includes(inputValue.trim())) {
                setChips((prevChips) => [...prevChips, inputValue.trim()]);
            }

            setInputValue('');
            event.preventDefault(); // Prevent form submission or unexpected behavior
        }
    };

    const handleDelete = (chipToDelete) => {
        setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
        setIsMaxHashtags(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', marginTop: '24px'}}>
            <TextField
                label="Add some hashtags"
                variant="standard"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
                fullWidth
            />
            { isMaxHashtags ? 
                <Typography variant='caption' color="error">
                    Max hashtags added
                </Typography>
            : ''
            }
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {chips.map((chip, index) => (
                    <Chip
                        key={index}
                        label={chip}
                        onDelete={() => handleDelete(chip)}
                        color="disabled"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default MultiChipTextField;
