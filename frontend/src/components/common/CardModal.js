import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import cardApi from '../../api/cardApi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modalBox: {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[24],
    padding: theme.spacing(1),
    height: '80%',
  },
}));

const CardModal = (props) => {
  const classes = useStyles();
  const boardId = props.boardId;
  const [card, setCard] = useState(props.card || {});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorWrapperRef = useRef();
  let timer;

  useEffect(() => {
    setCard(props.card || {});
    setTitle(props.card?.title || '');
    setContent(props.card?.content || '');
  }, [props.card]);

  const onClose = () => {
    props.onClose();
  };

  const deleteCard = async () => {
    try {
      await cardApi.delete(boardId, card.id);
      props.onDelete(card);
      onClose();
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle error gracefully
    }
  };

  const updateTitle = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        await cardApi.update(boardId, card.id, { title: newTitle });
        setCard((prevCard) => ({ ...prevCard, title: newTitle }));
        props.onUpdate(card);
      } catch (error) {
        console.error('Error updating card title:', error);
        // Handle error gracefully
      }
    }, 500); 
  };
  
  const updateContent = (e) => {
    const data = e.target.value;
    setContent(data);
    setCard((prevCard) => ({ ...prevCard, content: data }));
    props.onUpdate(card);
  };

  return (
    <Modal
      open={!!card.id}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={!!card.id}>
        <Box className={classes.modalBox}>
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
              {card ? Moment(card.createdAt).format('YYYY-MM-DD') : ''}
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
