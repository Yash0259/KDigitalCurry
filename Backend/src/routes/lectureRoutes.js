const express = require('express');
const router = express.Router();
const {
  createLecture,
  getLectures,
  updateLecture,
  markAttendance,
  deleteLecture
} = require('../controllers/lectureController');

// Create lecture
router.post('/', createLecture);

// Get lectures (with optional filtering)
router.get('/', getLectures);

// Update lecture details
router.put('/:id', updateLecture);

// Mark attendance
router.patch('/:id/attendance', markAttendance);

// Delete lecture
router.delete('/:id', deleteLecture);

module.exports = router;