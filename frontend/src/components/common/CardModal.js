import React, { useEffect,  useState } from 'react';
import { Backdrop, Box, Button,  Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import cardApi from '../../api/cardApi';

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '80%',
};

// let timer;
// const timeout = 500;
const CardModal = ({ boardId, card: initialCard, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(initialCard?.title || '');
  const [description, setDescription] = useState(initialCard?.description || '');
  const [content, setContent] = useState(initialCard?.content || '');

  useEffect(() => {
    setTitle(initialCard?.title || '');
    setDescription(initialCard?.description || '');
    setContent(initialCard?.content || '');
  }, [initialCard]);

  const handleDeleteCard = async () => {
    try {
      await cardApi.delete(boardId, initialCard.id);
      onDelete(initialCard);
      onClose();
    } catch (error) {
      alert('Error deleting card');
    }
  };

  // const updateEditorHeight = () => {
  //   setTimeout(() => {
  //     if (editorWrapperRef.current) {
  //       const box = editorWrapperRef.current;
  //       box.style.height = (box.offsetHeight - 50) + 'px';
  //     }
  //   }, timeout);
  // };
  
  const handleUpdateCard = async () => {
    const updatedCard = { ...initialCard, title, description, content };
    try {
      await cardApi.update(boardId, initialCard.id, updatedCard);
      onUpdate(updatedCard);
      onClose();
    } catch (error) {
      alert('Error updating card');
    }
  };

  return (
    <Modal
      open={!!initialCard}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={!!initialCard}>
        <Box sx={modalStyle}>
          <IconButton variant='outlined' color='error' onClick={handleDeleteCard}>
            <DeleteOutlinedIcon />
          </IconButton>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
          />
          <Divider sx={{ margin: '1rem 0' }} />
          <Typography variant='body2'>
            {initialCard ? Moment(initialCard.createdAt).format('YYYY-MM-DD') : ''}
          </Typography>
          <Box display="flex" justifyContent="flex-end" marginTop="auto">
            <Button onClick={handleUpdateCard} color="primary">Save Changes</Button>
            <Button onClick={onClose} color="secondary">Cancel</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CardModal;