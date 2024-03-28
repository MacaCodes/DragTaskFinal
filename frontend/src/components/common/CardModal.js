import { Backdrop, Box, Button, Fade, IconButton, Modal, TextField, Typography, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import cardApi from '../../api/cardApi';
import '../../css/custom-editor.css';

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

const CardModal = ({ boardId, card, onUpdate, onDelete, onClose }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [content, setContent] = useState(card?.content || '');
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTitle(card?.title || '');
    setContent(card?.content || '');
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

  const deleteCard = async () => {
    try {
      await cardApi.delete(boardId, card.id);
      onDelete(card);
      onClose();
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error deleting card');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedCard = { ...card, title, content };
      await cardApi.update(boardId, card.id, updatedCard);
      onUpdate(updatedCard);
      onClose();
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

  const updateContent = (event, editor) => {
    const data = editor.getData();
    setContent(data);
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleUpdate();
    }, timeout);
  };

  return (
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
  );
};

export default CardModal;
