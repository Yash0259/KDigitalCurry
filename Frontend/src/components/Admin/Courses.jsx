// components/Courses.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addNewCourse, updateCourse, deleteCourse } from '../../Redux/courseSlice';
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
import AddCourse from './AddCourse';
import EditCourses from './EditCourses';

const Courses = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);

  const { courses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleMenuClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setCurrentCourse(course);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentCourse(null);
  };

  const handleOpenModal = () => setAddModel(true);
  const handleCloseModal = () => setAddModel(false);

  const handleOpenEditModal = () => setEditModel(true);
  const handleCloseEditModal = () => setEditModel(false);

  const handleSaveCourse = (newCourse) => {
    dispatch(addNewCourse(newCourse))
      .unwrap()
      .then(() => {
        alert('Course added successfully!');
        handleCloseModal();
        dispatch(fetchCourses()); // Refresh the list
      })
      .catch((error) => {
        alert('Failed to save course.');
        console.error('Failed to save course:', error);
      });
  };
  

  const handleSaveUpdatedCourse = (updatedCourse) => {
    dispatch(updateCourse(updatedCourse)) // Send full course object
      .unwrap()
      .then(() => {
        alert('Course updated successfully!');
        handleCloseEditModal();
        dispatch(fetchCourses()); // Refresh the list
      })
      .catch((error) => {
        alert('Failed to update course.');
        console.error('Failed to update course:', error);
      });
  };
  
  
  const handleDeleteCourse = () => {
    if (currentCourse?._id) {
      dispatch(deleteCourse(currentCourse._id))
        .unwrap()
        .then(() => {
          alert('Course deleted successfully!');
          handleClose();
          dispatch(fetchCourses()); // Refresh
        })
        .catch((error) => {
          alert('Failed to delete course.');
          console.error('Failed to delete course:', error);
        });
    }
  };
  

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box p={3}>
        <Alert severity="error">Error loading courses: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1e4db7' }}
          onClick={handleOpenModal}
        >
          Add Course
        </Button>
      </Box>

      <AddCourse
        open={addModel}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
      />

      <EditCourses
        open={editModel}
        onClose={handleCloseEditModal}
        onSave={handleSaveUpdatedCourse}
        initialData={currentCourse}
      />

      <Typography variant="h6" mb={1}>Courses</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e4db7' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>#</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Level</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, course)}>
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
      >
        <MenuItem onClick={handleOpenEditModal}>Edit {currentCourse?.name}</MenuItem>
        <MenuItem onClick={handleDeleteCourse}>Delete {currentCourse?.name}</MenuItem>
      </Menu>
    </Box>
  );
};

export default Courses;
