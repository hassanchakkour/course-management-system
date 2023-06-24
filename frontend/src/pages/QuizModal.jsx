
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
      width: '700px',
      maxWidth:'100%',
      bgcolor: '#1F2937',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      
     
    };
  return (
    <div>
      <Button onClick={handleOpen}>Quiz</Button>
     
      <Modal
      className={`w-full bg-gray-800 `}
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
