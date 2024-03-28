<<<<<<< HEAD
import { Backdrop, Box, Button, Fade, IconButton, Modal, TextField, Typography, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import cardApi from '../../api/cardApi';
<<<<<<< HEAD
import '../../css/custom-editor.css';
=======
>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f

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

const timeout = 500;
<<<<<<< HEAD
let isModalClosed = false;

const CardModal = ({ boardId, card, onUpdate, onDelete, onClose }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [content, setContent] = useState(card?.content || '');
  const editorWrapperRef = useRef();
=======

const CardModal = ({ boardId, card, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [content, setContent] = useState(card?.content || '');
>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f

  useEffect(() => {
    setTitle(card?.title || '');
    setContent(card?.content || '');
<<<<<<< HEAD
    if (card !== undefined) {
      isModalClosed = false;
      updateEditorHeight();
    }
  }, [card]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        box.querySelector('.ck-editor__editable_inline').style.height = box.offsetHeight - 50 + 'px';
      }
    }, timeout);
  };

  const onCloseModal = () => {
    isModalClosed = true;
    onUpdate(card);
    onClose();
  };

=======
  }, [card]);

>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f
  const deleteCard = async () => {
    try {
      if (card && card.id) { // Null check
        await cardApi.delete(boardId, card.id);
        onDelete(card);
        onClose();
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error deleting card');
    }
  };

  const handleUpdate = async () => {
    try {
      if (card && card.id) { // Null check
        const updatedCard = { ...card, title, content };
        await cardApi.update(boardId, card.id, updatedCard);
        onUpdate(updatedCard);
        onClose();
      }
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Error updating card');
    }
  };

  const updateTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleUpdate();
    }, timeout);
  };

<<<<<<< HEAD
  const updateContent = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    clearTimeout(timer);
    timer = setTimeout(() => {
=======
  const updateContent = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    clearTimeout(window.contentTimer);
    window.contentTimer = setTimeout(() => {
>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f
      handleUpdate();
    }, timeout);
  };

  return (
<<<<<<< HEAD
    <>
      <Modal
        open={card !== undefined}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={!!card}>
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <IconButton
                sx={{ position: 'absolute', right: 8, top: 8 }}
                color="error"
                onClick={deleteCard}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <Box sx={{ padding: '2rem', overflowY: 'auto' }}>
              <TextField
                label="Title"
                value={title}
                onChange={updateTitle}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box
                ref={editorWrapperRef}
                sx={{
                  position: 'relative',
                  height: '80%',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }}
              >
                <CKEditor editor={ClassicEditor} data={content} onChange={updateContent} />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
=======
    <Modal
      open={!!card}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={!!card}>
        <Box sx={modalStyle}>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} color="error" onClick={deleteCard}>
            <DeleteOutlinedIcon />
          </IconButton>
          <Box sx={{ padding: '2rem', overflowY: 'auto' }}>
            <TextField
              label="Title"
              value={title}
              onChange={updateTitle}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {Moment(card?.createdAt).format('YYYY-MM-DD')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              label="Content"
              value={content}
              onChange={updateContent}
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button color="secondary" onClick={onClose}>Cancel</Button>
              <Button sx={{ ml: 1 }} color="primary" onClick={handleUpdate}>Save Changes</Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
>>>>>>> 57596abcb22360a7cb6d2783c9e813520ffb0a4f
  );
};

export default CardModal;
