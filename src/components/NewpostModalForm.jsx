import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Modal, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { uploadFilesToSupabase } from '../utils/fileHelper';

const NewpostModalForm = ({isOpen, handleClose}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [chips, setChips] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isMaxHashtags, setIsMaxHastags] = useState(false);
    const MAX_FILES = 5; // Maximum number of files allowed
    const MAX_HASHTAGS_COUNT = 10;

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Check if the selected files exceed the maximum allowed
        if (files.length + selectedFiles.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} files.`);
            return;
        }

        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            if (chips.length >= MAX_HASHTAGS_COUNT) {
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        try {
            // Upload files to Supabase and get URLs
            const fileUrls = await uploadFilesToSupabase(selectedFiles);
            console.log("MALIK FILE URLS IDHAR HAI: ",fileUrls);
            formJson.mediaFiles = fileUrls; // Replace file names with URLs

            // Add hashtags
            formJson.hashtags = chips;

            console.log("POST FORM DATA: ", formJson);

            // Handle form submission logic (e.g., API call)
            // await handlePostSubmission(formJson);

            // Close dialog
            handleClose();
        } catch (error) {
            console.error("Error uploading files or submitting post:", error)
        }
    }

  return (
      <Dialog
          open={isOpen}
          onClose={handleClose}
          PaperProps={{
              component: 'form',
              onSubmit: handleFormSubmit,
          }}
      >
          <DialogTitle>Share your vibe ✨</DialogTitle>
          <DialogContent>
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="Write a striking caption"
                  type="text"
                  fullWidth
                  variant="standard"
                  multiline
                  rows={4}
                  sx={{width: "100%", marginBottom: "24px"}}
              />
              <Button
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUpload/>}
              disableElevation
              >
                Upload Media
                <VisuallyHiddenInput type='file' onChange={handleFileChange} multiple accept="image/*"/>
              </Button>
              <p>{`Selected files: ${selectedFiles.length}/${MAX_FILES}`}</p>
              <ul>
                {selectedFiles.map((file, index) => (
                    <div>
                        <li className='flex flex-row w-full items-center justify-between py-2' key={index}>
                            {file.name}
                            <IconButton color='error' onClick={() => handleRemoveFile(index)}>
                                <Delete/>
                            </IconButton>
                        </li>
                        <Divider></Divider>
                    </div>
                ))}
              </ul>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', marginTop: '24px' }}>
                  <TextField
                      label="Add some hashtags"
                      variant="standard"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type and press Enter"
                      fullWidth
                  />
                  {isMaxHashtags ?
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
          </DialogContent>
          <DialogActions>
              <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
              <Button variant='contained' type="submit" color='success'>Post</Button>
          </DialogActions>
      </Dialog>
  )
}

export default NewpostModalForm
