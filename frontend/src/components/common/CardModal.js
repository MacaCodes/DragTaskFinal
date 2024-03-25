import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
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

let timer;
const timeout = 500;
let isModalClosed = false;

const CardModal = (props) => {
  const boardId = props.boardId;
  const [card, setCard] = useState(props.card);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorWrapperRef = useRef();

  useEffect(() => {
    setCard(props.card);
    setTitle(props.card !== undefined ? props.card.title : '');
    setContent(props.card !== undefined ? props.card.content : '');
    if (props.card !== undefined) {
      isModalClosed = false;
      updateEditorHeight();
    }
  }, [props.card]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        box.style.height = (box.offsetHeight - 50) + 'px';
      }
    }, timeout);
  };

  const onClose = () => {
    isModalClosed = true;
    props.onUpdate(card);
    props.onClose();
  };

 // Delete card function
const deleteCard = async () => {
  try {
    await cardApi.delete(boardId, card.id);
    props.onDelete(card);
    onClose(); // Close the modal after deletion
  } catch (error) {
    alert('Error deleting card');
  }
}
  // Update title function
  const updateTitle = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        await cardApi.update(boardId, card.id, { title: newTitle });
        card.title = newTitle;
        props.onUpdate(card);
      } catch (error) {
        alert('Error updating card title');
      }
    }, timeout);
  };
  
  const updateContent = (e) => {
    const data = e.target.value;
    setContent(data);
    // Update the card content in local state
    card.content = data;
    props.onUpdate(card);
  };

  return (
    <Modal
      open={card !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={card !== undefined}>
        <Box sx={modalStyle}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%'
          }}>
            <IconButton variant='outlined' color='error' onClick={deleteCard}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            padding: '2rem 5rem 5rem'
          }}>
            <TextField
              value={title}
              onChange={updateTitle}
              placeholder='Untitled'
              variant='outlined'
              fullWidth
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '700' },
                marginBottom: '10px'
              }}
            />
            <Typography variant='body2' fontWeight='700'>
              {card !== undefined ? Moment(card.createdAt).format('YYYY-MM-DD') : ''}
            </Typography>
            <Divider sx={{ margin: '1.5rem 0' }} />
            <Box
              ref={editorWrapperRef}
              sx={{
                position: 'relative',
                height: '80%',
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
            >
              <TextField
                value={content}
                onChange={updateContent}
                placeholder='Add content'
                variant='outlined'
                multiline
                fullWidth
                rows={10}
                sx={{ marginBottom: '10px' }}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};


export default CardModal;
