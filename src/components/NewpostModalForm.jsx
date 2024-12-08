import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const NewpostModalForm = ({isOpen, handleClose}) => {

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
          <DialogTitle>Share your vibe</DialogTitle>
          <DialogContent>
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="Write a caption"
                  type="text"
                  fullWidth
                  variant="standard"
              />
          </DialogContent>
          <DialogActions>
              <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
              <Button variant='contained' type="submit" color='success'>Post</Button>
          </DialogActions>
      </Dialog>
  )
}

export default NewpostModalForm
