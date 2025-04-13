import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstructors, addNewInstructor, updateInstructor, deleteInstructor } from '../../Redux/instructorSlice';
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
  InputLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddInstructor from './AddInstructor';
import EditInstructor from './EditInstructor';

const InstructorComp = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);


  // Get data from Redux store
  const { instructors, status, error } = useSelector((state) => state.instructor);

  // Fetch instructors when component mounts
  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

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

  const handleOpenEditModal = () => setEditModel(true);
  const handleCloseEditModal = () => setEditModel(false);

  const handleSaveInstructor = (newInstructor) => {
    dispatch(addNewInstructor(newInstructor))
      .unwrap()
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Failed to save instructor:', error);
      });
  };

  const handleSaveUpdatedInstructor = (updatedInstructor) => {
    dispatch(updateInstructor(updatedInstructor._id))
    .unwrap()
    .then(() => handleCloseEditModal())
    .catch((error) => {
      console.error('Failed to update instructor:', error);
    });
  };
  const handleDeleteInstructor = () => {
    if (currentInstructor?._id) {
      dispatch(deleteInstructor(currentInstructor._id))
      .unwrap()
      .then(() => handleClose())
      .catch((error) => {
        console.error('Failed to delete instructor:', error);
      });
    }
  };
  
  // Loading state
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <Box p={3}>
        <Alert severity="error">Error loading instructors: {error}</Alert>
      </Box>
    );
  }


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

      <EditInstructor
        open={editModel}
        onClose={handleCloseEditModal}
        onSave={handleSaveUpdatedInstructor}
        initialData={currentInstructor}
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
        <MenuItem onClick={handleOpenEditModal}>Edit {currentInstructor?.name}</MenuItem>
        <MenuItem onClick={handleDeleteInstructor}>
          Delete {currentInstructor?.name}
        </MenuItem>

      </Menu>
    </Box>
  );
};

export default InstructorComp;