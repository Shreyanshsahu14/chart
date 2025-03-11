import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Dialogue = ({modalOpen,handleCloseModal,modalStyle}) => {
  return (
    <div>
      <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={modalOpen}
    onClose={handleCloseModal}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
    >
    <Fade in={modalOpen}>
      <Box sx={modalStyle}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Edit Content
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Edit your content here...
        </Typography>
        <Button 
          onClick={handleCloseModal} 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Fade>
    </Modal>
    </div>
  )
}

export default Dialogue
