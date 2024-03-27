import React from 'react';
import { Button } from '@mui/material'; // Assuming you're using Material-UI

const Card = ({ onSave }) => {
  const handleSave = () => {
    // Call the onSave function passed as a prop
    if (onSave) {
      onSave();
    }
  };

  return (
    <div>
      {/* Card content */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Card;
