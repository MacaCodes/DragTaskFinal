import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Moment from 'moment';
import cardApi from '../../api/cardApi';
// import SaveButtonSaveCard from './SaveButtonSaveCard';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import '../../css/custom-editor.css'


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

const timeout = 5000;
const CardModal = ({ boardId, card, onUpdate, onDelete, onClose }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [content, setContent] = useState(card?.content || '');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setContent(card.content || '');
    }
  }, [card]);


  // const updateEditorHeight = () => {
  //   setTimeout(() => {
  //     if (editorWrapperRef.current) {
  //       const box = editorWrapperRef.current
  //       box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
  //     }
  //   }, timeout)
  // }
  // const onClose = () => {
  //   onUpdate(card)
  //   onClose();
  // }

  const deleteCard = async () => {
    try {
      await cardApi.delete(boardId, card.id);
      onDelete(card);
      onClose();
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Error deleting card');
    }
  }

  const handleUpdate = async () => {
    const updatedCard = { ...card, title, content };
    try {
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
    clearTimeout(window.titleTimer);
    window.titleTimer = setTimeout(() => {
      handleUpdate();
    }, timeout);
  };



  const updateContent = async (event, editor) => {
    const data = editor.getData();
    setContent(data);
    clearTimeout(window.contentTimer);
    window.contentTimer = setTimeout(() => {
      handleUpdate();
    }, timeout);
  };

  const handleClose = () => {
    onUpdate(card)
    onClose();
  }

  return (
    <>
      <Modal
        open={!!card}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={!!card}>
          <Box sx={modalStyle}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%'
            }}>
              <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} color="error" onClick={deleteCard}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <Box sx={{ padding: '2rem', overflowY: 'auto' }}>
              <TextField id
                label="Title"
                value={title}
                onChange={updateTitle}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Box
                sx={{
                  position: 'relative',
                  height: '80%',
                  overflowX: 'hidden',
                  overflowY: 'auto'
                }}
              >              <Divider sx={{ margin: '1.5rem 0' }} />
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={updateContent}
                />              <Divider sx={{ margin: '1.5rem 0' }} />
<Typography variant='body2' fontWeight='700'>
                {card !== undefined ? Moment(card.createdAt).format('YYYY-MM-DD') : ''}
              </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button color="secondary" onClick={handleClose}>Cancel</Button>
                  <Button sx={{ ml: 1 }} color="primary" onClick={handleUpdate}>Save Changes</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>

      </Modal>
    </>

  );
};

export default CardModal;

// import React, { useEffect,  useState } from 'react';
// import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import Moment from 'moment';
// import cardApi from '../../api/cardApi';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '../../css/custom-editor.css';

// const modalStyle = {
//   outline: 'none',
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '50%',
//   bgcolor: 'background.paper',
//   border: '0px solid #000',
//   boxShadow: 24,
//   p: 1,
//   height: '80%',
// };

// const timeout = 500;

// const CardModal = ({ boardId, card, onClose, onUpdate, onDelete }) => {
//   const [title, setTitle] = useState(card?.title || '');
//   const [content, setContent] = useState(card?.content || '');
//   // const editorWrapperRef = useRef();

//   useEffect(() => {
//     setTitle(card?.title || '');
//     setContent(card?.content || '');
//   }, [card]);

//   const deleteCard = async () => {
//     try {
//       await cardApi.delete(boardId, card.id);
//       onDelete(card);
//       onClose();
//     } catch (error) {
//       console.error('Error deleting card:', error);
//       alert('Error deleting card');
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedCard = { ...card, title, content };
//       await cardApi.update(boardId, card.id, updatedCard);
//       onUpdate(updatedCard);
//       onClose();
//     } catch (error) {
//       console.error('Error updating card:', error);
//       alert('Error updating card');
//     }
//   };

//   const updateTitle = (e) => {
//     const newTitle = e.target.value;
//     setTitle(newTitle);
//     clearTimeout(window.titleTimer);
//     window.titleTimer = setTimeout(() => {
//       handleUpdate();
//     }, timeout);
//   };

//   const updateContent = (event, editor) => {
//     const data = editor.getData();
//     setContent(data);
//     clearTimeout(window.contentTimer);
//     window.contentTimer = setTimeout(() => {
//       handleUpdate();
//     }, timeout);
//   };

//   return (
//     <Modal
//       open={!!card}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{ timeout: 500 }}
//     >
//       <Fade in={!!card}>
//         <Box sx={modalStyle}>
//           <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} color="error" onClick={deleteCard}>
//             <DeleteOutlinedIcon />
//           </IconButton>
//           <Box sx={{ padding: '2rem', overflowY: 'auto' }}>
//             <TextField
//               label="Title"
//               value={title}
//               onChange={updateTitle}
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//             />
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               {Moment(card?.createdAt).format('YYYY-MM-DD')}
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <CKEditor
//               editor={ClassicEditor}
//               data={content}
//               onChange={updateContent}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button color="secondary" onClick={onClose}>Cancel</Button>
//               <Button sx={{ ml: 1 }} color="primary" onClick={handleUpdate}>Save Changes</Button>
//             </Box>
//           </Box>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// };

// export default CardModal;
