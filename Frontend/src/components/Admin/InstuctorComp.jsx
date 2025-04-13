import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddInstructor from './AddInstructor';

const InstructorComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [addModel, setAddModel] = useState(false);
  
  
  const [instructors, setInstructors] = useState([
    { name: 'John Doe', phone: '(123) 456-7890', email: 'john.doe@example.com' },
    { name: 'Jane Smith', phone: '(987) 654-3210', email: 'jane.smith@example.com' },
    { name: 'Mark Johnson', phone: '(555) 123-4567', email: 'mark.johnson@example.com' },
    { name: 'Emily White', phone: '(333) 987-6543', email: 'emily.white@example.com' },
  ]);

  const handleMenuClick = (event, instructor) => {
    setAnchorEl(event.currentTarget);
    setCurrentInstructor(instructor);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentInstructor(null);
  };

  const handleOpenModal = () => setAddModel(true);
  const handleCloseModal = () => setAddModel(false);

  const handleSaveInstructor = (newInstructor) => {
    setInstructors(prev => [...prev, newInstructor]);
    handleCloseModal();
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Filters</InputLabel>
          <Select label="Filters" defaultValue="">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="recent">Recently Added</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#1e4db7' }} 
          onClick={handleOpenModal}
        >
          Add Instructor
        </Button>
      </Box>

      <AddInstructor 
        open={addModel}
        onClose={handleCloseModal}
        onSave={handleSaveInstructor}
      />

      <Typography variant="h6" mb={1}>Instructor</Typography>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e4db7' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Sr No.</TableCell>
              <TableCell sx={{ color: 'white' }}>Instructor Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map((inst, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{inst.name}</TableCell>
                <TableCell>{inst.phone}</TableCell>
                <TableCell>{inst.email}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, inst)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Edit {currentInstructor?.name}</MenuItem>
        <MenuItem onClick={handleClose}>Delete {currentInstructor?.name}</MenuItem>
      </Menu>
    </Box>
  );
};

export default InstructorComp;