import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructors } from '../../Redux/instructorSlice';
import { fetchCourses } from '../../Redux/courseSlice';
import { addLecture } from '../../Redux/lectureSlice';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Slider,
  CircularProgress,
} from '@mui/material';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddLecture = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  // Redux state
  const { instructors, status: instructorsStatus } = useSelector((state) => state.instructors || {});
  const { courses, status: coursesStatus } = useSelector((state) => state.courses || {});

  // Local state
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [lectureDate, setLectureDate] = useState(null);
  const [startTime, setStartTime] = useState('00:00');
  const [duration, setDuration] = useState(60);

  // Fetch instructors and courses only if needed
  useEffect(() => {
    if (open) {
      if (instructorsStatus === 'idle') dispatch(fetchInstructors());
      if (coursesStatus === 'idle') dispatch(fetchCourses());
    }
  }, [open, dispatch, instructorsStatus, coursesStatus]);

  const handleInstructorChange = (e) => setSelectedInstructor(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);
  const handleDateChange = (date) => setLectureDate(date);
  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleDurationChange = (e, value) => setDuration(value);

  const resetForm = () => {
    setSelectedInstructor('');
    setSelectedCourse('');
    setLectureDate(null);
    setStartTime('00:00');
    setDuration(60);
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = () => {
    if (!selectedInstructor || !selectedCourse || !lectureDate || !startTime) {
      alert('Please fill in all fields.');
      return;
    }

    const newLecture = {
      instructor: selectedInstructor,
      course: selectedCourse,
      date: lectureDate,
      startTime: startTime,
      duration: duration,
    };

    dispatch(addLecture(newLecture));
    handleCloseModal();
  };

  // Loading state
  if (instructorsStatus === 'loading' || coursesStatus === 'loading') {
    return (
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" disabled>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Error state
  if (instructorsStatus === 'failed' || coursesStatus === 'failed') {
    return (
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">Failed to load data. Please try again later.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
      <DialogTitle>Add New Lecture</DialogTitle>
      <DialogContent>
        {/* Instructor Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Instructor</InputLabel>
          <Select
            value={selectedInstructor}
            onChange={handleInstructorChange}
            label="Instructor"
          >
            {instructors?.length > 0 ? (
              instructors.map((instructor) => (
                <MenuItem key={instructor._id} value={instructor._id}>
                  {instructor.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No instructors available</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Course Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={handleCourseChange}
            label="Course"
          >
            {courses?.length > 0 ? (
              courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No courses available</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Date Picker */}
        <Typography variant="body1" gutterBottom>
          Date of Lecture
        </Typography>
        <DatePicker
          selected={lectureDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className="form-control"
          style={{ width: '100%' }}
        />

        {/* Start Time Picker */}
        <Typography variant="body1" gutterBottom>
          Start Time
        </Typography>
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          className="form-control"
          style={{
            margin: '10px 0',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
          }}
        />

        {/* Duration Slider */}
        <Typography gutterBottom>Lecture Duration (in minutes)</Typography>
        <Slider
          value={duration}
          onChange={handleDurationChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} min`}
          min={30}
          max={180}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Lecture
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLecture;
