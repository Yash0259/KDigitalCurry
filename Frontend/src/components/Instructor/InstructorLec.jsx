import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectures, markAttendance } from '../../Redux/lectureSlice'; 
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
  Typography
} from '@mui/material';

const InstructorLec = () => {
  const dispatch = useDispatch();
  const [instructorId, setInstructorId] = useState(sessionStorage.getItem("instructorId"));
  
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the stored user object
  const [instructorName, setInstructorName] = useState(user?.name || 'Instructor');


  const { lectures, status, error } = useSelector((state) => state.lectures);

  useEffect(() => {
    if (instructorId) {
      dispatch(fetchLectures());
    }
  }, [instructorId, dispatch]);

  const handleMarkAttendance = (lectureId) => {
    dispatch(markAttendance({ lectureId }));  // Call with only lectureId, status is fixed
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Welcome message at the top */}
      <Typography variant="h4" gutterBottom>
        Welcome, {instructorName}
      </Typography>

      <h3>Instructor's Lectures</h3>
      {/* Lectures Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Lecture Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Attendance</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lectures && Array.isArray(lectures) && lectures.length > 0 ? (
              lectures.map((lecture) => (
                <TableRow key={lecture._id}>
                  <TableCell>{lecture.course?.name}</TableCell>
                  <TableCell>{new Date(lecture.date).toLocaleDateString()}</TableCell>
                  <TableCell>{lecture.startTime}</TableCell>
                  <TableCell>{lecture.endTime}</TableCell>
                  <TableCell>{lecture.attendanceStatus || 'Not Marked'}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleMarkAttendance(lecture._id)}
                      variant="outlined"
                      disabled={lecture.attendanceStatus === 'Attended'}
                      sx={{
                        opacity: lecture.attendanceStatus === 'Attended' ? 0.5 : 1,  // Make it faint
                        pointerEvents: lecture.attendanceStatus === 'Attended' ? 'none' : 'auto', // Disable clicks
                      }}
                    >
                      Mark as Attended
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">No lectures available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InstructorLec;
