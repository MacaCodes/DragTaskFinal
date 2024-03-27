import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const CardDetails = ({ cardData, onClose, onUpdate }) => {
  const [editable, setEditable] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(cardData.title);
  const [updatedDescription, setUpdatedDescription] = useState(cardData.description);

  const handleUpdate = () => {
    const updatedCardData = { ...cardData, title: updatedTitle, description: updatedDescription };
    onUpdate(updatedCardData);
    onClose();
  };

  return (
    <Dialog open={!!cardData} onClose={onClose}>
      {cardData && (
        <>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={editable ? updatedTitle : cardData.title}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            <TextField
              label="Description"
              value={editable ? updatedDescription : cardData.description}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              multiline
              fullWidth
              margin="normal"
              disabled={!editable}
            />
            {/* Render other card details as needed */}
          </DialogContent>
          <DialogActions>
            {!editable && (
              <Button onClick={() => setEditable(true)} color="primary">Edit</Button>
            )}
            {editable && (
              <>
                <Button onClick={handleUpdate} color="primary">Update</Button>
                <Button onClick={() => setEditable(false)} color="secondary">Cancel</Button>
              </>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CardDetails;
