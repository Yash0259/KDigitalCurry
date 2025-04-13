// components/EditCourse.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

const EditCourse = ({ open, onClose, onSave, initialData }) => {
  const [course, setCourse] = useState({
    name: '',
    level: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setCourse({
        name: initialData.name,
        level: initialData.level,
        description: initialData.description
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave({ ...course, id: initialData._id });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
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
            label="Course Description"
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

export default EditCourse;
