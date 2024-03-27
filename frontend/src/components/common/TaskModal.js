import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import taskApi from '../../api/taskApi';

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

const TaskModal = (props) => {
  const boardId = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task !== undefined ? props.task.title : '');
    setContent(props.task !== undefined ? props.task.content : '');
    if (props.task !== undefined) {
      isModalClosed = false;
      updateEditorHeight();
    }
  }, [props.task]);

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
    props.onUpdate(task);
    props.onClose();
  };

  const deleteTask = async () => {
    try {
      // Call your API to delete the task
      // await taskApi.delete(boardId, task.id);
      props.onDelete(task);
      setTask(undefined);
    } catch (err) {
      alert(err);
    }
  };

  const updateTitle = (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(() => {
      // Call your API to update the task title
      // taskApi.update(boardId, task.id, { title: newTitle });
      task.title = newTitle;
      setTitle(newTitle);
      props.onUpdate(task);
    }, timeout);
  };

  const updateContent = (e) => {
    const data = e.target.value;
    setContent(data);
<<<<<<< Updated upstream:frontend/src/components/common/TaskModal.js
    // Update the task content in local state
    task.content = data;
    props.onUpdate(task);
  };
=======
    // Update the card content in local state
    card.content = data;
    if (typeof props.onUpdate === 'function') {
      props.onUpdate(card);
    }
      };
>>>>>>> Stashed changes:frontend/src/components/common/CardModal.js

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%'
          }}>
            <IconButton variant='outlined' color='error' onClick={deleteTask}>
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
              {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''}
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

export default TaskModal;
