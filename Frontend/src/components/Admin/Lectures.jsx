import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectures, deleteLecture } from '../../Redux/lectureSlice';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddLecture from './AddLecture';

const Lectures = () => {
  const dispatch = useDispatch();
  const { lectures, status, error } = useSelector((state) => state.lectures);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLectures());
  }, [dispatch]);

  const handleMenuClick = (event, lecture) => {
    setAnchorEl(event.currentTarget);
    setSelectedLecture(lecture);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedLecture(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLecture(null);
  };

  const handleDelete = async () => {
    if (selectedLecture?._id) {
      try {
        await dispatch(deleteLecture(selectedLecture._id)).unwrap();
        alert('✅ Lecture deleted successfully!');
        dispatch(fetchLectures()); // Refresh the list
      } catch (error) {
        alert('❌ Failed to delete lecture.');
        console.error('Delete error:', error);
      }
    }
    handleCloseMenu();
  };

  const lectureList = Array.isArray(lectures) ? lectures : [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Lectures</Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          Add Lecture
        </Button>
      </Box>

      {/* Add Lecture Modal */}
      <AddLecture open={modalOpen} handleClose={handleCloseModal} />

      {/* Loading State */}
      {status === 'loading' && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <Typography color="error">{error || 'Failed to load lectures'}</Typography>
      )}

      {/* Table */}
      {status === 'succeeded' && lectureList.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lectureList.map((lecture, index) => {
              const isMenuOpen = Boolean(anchorEl) && selectedLecture?._id === lecture._id;

              return (
                <TableRow key={lecture._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{lecture.instructor?.name || '-'}</TableCell>
                  <TableCell>{lecture.course?.name || '-'}</TableCell>
                  <TableCell>{new Date(lecture.date).toLocaleDateString()}</TableCell>
                  <TableCell>{lecture.startTime}</TableCell>
                  <TableCell>{lecture.endTime}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, lecture)}>
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={isMenuOpen}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      keepMounted
                    >
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : status === 'succeeded' && lectureList.length === 0 ? (
        <Typography>No lectures available.</Typography>
      ) : null}
    </Box>
  );
};

export default Lectures;
