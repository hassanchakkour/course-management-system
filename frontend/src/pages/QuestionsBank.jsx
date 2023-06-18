
import React, { useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import Question from './Question'

function QuestionsBank() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
    <Button onClick={handleOpen}>Questions</Button>
   
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Question />
  
      </Box>
    </Modal>
    
    
  </div>
  )
}

export default QuestionsBank
