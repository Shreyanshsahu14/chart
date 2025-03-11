import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Dialogue from './Dialogue';

// Styled dropdown menu
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Dropdown component with integrated parent logic
export default function DropdownWithDialog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const menuOpen = Boolean(anchorEl);

  // Menu handlers
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Modal handlers
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Combined edit handler
  const handleEditClick = () => {
    handleMenuClose();
    handleOpenModal();
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <Button
        id="demo-customized-button"
        aria-controls={menuOpen ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleMenuClick}
        endIcon={<MoreVertIcon />}
        style={{ backgroundColor: "transparent", border: "none", color: "black" }}
      >
      </Button>
      
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>

      {/* Edit Modal */}
 { modalOpen && <Dialogue modalOpen={modalOpen} handleCloseModal={handleCloseModal} modalStyle={modalStyle} />}
    </div>
  );
}