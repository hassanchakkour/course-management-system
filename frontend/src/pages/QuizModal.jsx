
import React, { useState } from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import Quiz from './Quiz'

function QuizModal() {

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
      width: '60%',
      bgcolor: '#20232A',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  return (
    <div>
      <Button onClick={handleOpen}>Quiz</Button>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Quiz />
    
        </Box>
      </Modal>
      
      
    </div>
  )
}

export default QuizModal
