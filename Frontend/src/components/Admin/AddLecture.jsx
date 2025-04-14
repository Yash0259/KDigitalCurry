import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructors } from '../../Redux/instructorSlice';
import { fetchCourses } from '../../Redux/courseSlice';
import { fetchLectures, addLecture } from '../../Redux/lectureSlice';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle, Button,
  MenuItem, Select, InputLabel, FormControl, Typography,
  Slider, CircularProgress,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddLecture = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { instructors, status: instructorsStatus } = useSelector((state) => state.instructors || {});
  const { courses, status: coursesStatus } = useSelector((state) => state.courses || {});
  const { lectures } = useSelector((state) => state.lectures || {});

  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [lectureDate, setLectureDate] = useState(null);
  const [startTime, setStartTime] = useState('00:00');
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    if (open) {
      if (instructorsStatus === 'idle') dispatch(fetchInstructors());
      if (coursesStatus === 'idle') dispatch(fetchCourses());
      dispatch(fetchLectures());
    }
  }, [open, dispatch, instructorsStatus, coursesStatus]);

  const handleInstructorChange = (e) => setSelectedInstructor(e.target.value);
  const handleCourseChange = (e) => setSelectedCourse(e.target.value);

  // Move the DatePicker above and reset instructor when date changes
  const handleDateChange = (date) => {
    setLectureDate(date);
    setSelectedInstructor(''); // Reset instructor when date changes
  };

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

  const handleSubmit = async () => {
    if (!selectedInstructor || !selectedCourse || !lectureDate || !startTime) {
      alert('Please fill in all fields.');
      return;
    }

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMins = startHour * 60 + startMinute;
    const endTotalMins = startTotalMins + duration;
    const endHour = Math.floor(endTotalMins / 60);
    const endMinute = endTotalMins % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

    const newLecture = {
      course: selectedCourse,
      instructor: selectedInstructor,
      date: lectureDate,
      startTime,
      endTime,
    };

    try {
      // Attempt to add the lecture
      await dispatch(addLecture(newLecture)).unwrap();
      alert('Lecture added successfully!');
      dispatch(fetchLectures());
      handleCloseModal();
    } catch (error) {
      if (error?.response?.status === 409) {
        // Handle the 409 Conflict error with a more descriptive message
        alert('There is already a lecture scheduled for this instructor at this time. Please select a different time.');
      } else {
        // Handle other errors
        const message =
          error?.response?.data?.error ||
          error?.message ||
          'Failed to add lecture. Please check constraints.';
        alert(message);
      }
    }
  };

  // Identify instructors who already have 2+ lectures on selected date
  const disabledInstructorIds = (() => {
    if (!lectureDate || !lectures?.length) return [];
    const dateOnly = new Date(lectureDate).toISOString().split('T')[0];
    const counts = {};

    lectures.forEach((lec) => {
      const lecDate = new Date(lec.date).toISOString().split('T')[0];
      if (lecDate === dateOnly) {
        const id = lec.instructor?._id || lec.instructor;
        counts[id] = (counts[id] || 0) + 1;
      }
    });

    return Object.keys(counts).filter((id) => counts[id] >= 2);
  })();

  if (instructorsStatus === 'loading' || coursesStatus === 'loading') {
    return (
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (instructorsStatus === 'failed' || coursesStatus === 'failed') {
    return (
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography color="error">Failed to load data. Please try again.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
      <DialogTitle>Add New Lecture</DialogTitle>
      <DialogContent>
        {/* Date Picker moved above */}
        <Box sx={{ pl: 4 }}>
          <Typography variant="body1" gutterBottom>Date of Lecture</Typography>
          <DatePicker
            selected={lectureDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="custom-datepicker-input"
            calendarClassName="custom-calendar"
            popperPlacement="bottom"
          />
        </Box>


        <FormControl fullWidth margin="normal">
          <InputLabel>Instructor</InputLabel>
          <Select
            value={selectedInstructor}
            onChange={handleInstructorChange}
            label="Instructor"
          >
            {instructors?.map((instructor) => (
              <MenuItem
                key={instructor._id}
                value={instructor._id}
                disabled={disabledInstructorIds.includes(instructor._id)}
              >
                {instructor.name} {disabledInstructorIds.includes(instructor._id) && '(Max reached)'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={handleCourseChange}
            label="Course"
          >
            {courses?.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body1" gutterBottom>Start Time</Typography>
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          className="form-control"
          style={{ margin: '10px 0', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
        />

        <Typography gutterBottom>Lecture Duration (in minutes)</Typography>
        <Slider
          value={duration}
          onChange={handleDurationChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => `${val} min`}
          min={30}
          max={180}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add Lecture</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLecture;
