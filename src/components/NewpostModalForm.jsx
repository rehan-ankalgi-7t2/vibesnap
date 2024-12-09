import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Modal, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MultiChipTextField from './MultiChipTextField';

const NewpostModalForm = ({isOpen, handleClose}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const MAX_FILES = 5; // Maximum number of files allowed

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

    const handleCancel = () => {
        // setSelectedFiles([])
    }

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

  return (
      <Dialog
          open={isOpen}
          onClose={handleClose}
          PaperProps={{
              component: 'form',
              onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
              },
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
              <MultiChipTextField/>
          </DialogContent>
          <DialogActions>
              <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
              <Button variant='contained' type="submit" color='success'>Post</Button>
          </DialogActions>
      </Dialog>
  )
}

export default NewpostModalForm
