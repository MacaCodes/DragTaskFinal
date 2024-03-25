import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from './Card';

const List = ({ list, onListDelete }) => {
  const handleCardDelete = (cardId) => {
  
    console.log(`Deleting card with ID: ${cardId}`);
  };

  const handleListDelete = () => {
    console.log(`Deleting list with ID: ${list.id}`);
    onListDelete(list.id); 
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', marginBottom: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{list.title}</Typography>
        <IconButton onClick={handleListDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {/* Render cards */}
      {list.cards.map((card) => (
        <Card key={card.id} card={card} onDelete={handleCardDelete} />
      ))}
    </Box>
  );
};

export default List;
