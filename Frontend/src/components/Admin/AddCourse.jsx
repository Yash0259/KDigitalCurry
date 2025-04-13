import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const AddCourse = ({ open, onClose, onSave }) => {
  const [course, setCourse] = useState({
    name: '',
    level: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(course);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Course Name"
            name="name"
            value={course.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Course Level"
            name="level"
            value={course.level}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            minRows={3}
            label="Description"
            name="description"
            value={course.description}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCourse;
