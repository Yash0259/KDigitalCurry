const Lecture = require("../Models/Lecture");
const Course = require("../Models/Course");
const Instructor = require("../Models/Instructor");

// Schedule new lecture with conflict checking
exports.createLecture = async (req, res) => {
  const { course, instructor, date, startTime, endTime } = req.body;

  // Validate required fields
  if (!course || !instructor || !date || !startTime || !endTime) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Verify course exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Verify instructor exists
    const instructorExists = await Instructor.findById(instructor);
    if (!instructorExists) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({ error: "Time must be in HH:MM format" });
    }

    // Convert times to minutes for comparison
    const toMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);

    // Validate end time is after start time
    if (endMinutes <= startMinutes) {
      return res.status(400).json({ error: "End time must be after start time" });
    }

    // Create new lecture (pre-save hook will check for conflicts)
    const lecture = new Lecture({
      course,
      instructor,
      date: new Date(date),
      startTime,
      endTime
    });

    await lecture.save();
    res.status(201).json(lecture);

  } catch (err) {
    // Handle scheduling conflicts
    if (err.message.includes('already booked')) {
      return res.status(409).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

// Get all lectures with filters
exports.getLectures = async (req, res) => {
  try {
    let query = {};
    
    // Filter by instructor if provided
    if (req.query.instructor) {
      query.instructor = req.query.instructor;
    }
    
    // Filter by date range if provided
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const lectures = await Lecture.find(query)
      .populate('course', 'name level')
      .populate('instructor', 'name email')
      .sort({ date: 1, startTime: 1 });

    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update lecture (with conflict checking)
exports.updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Create temp lecture with updates to test for conflicts
    const updatedLecture = new Lecture({
      ...lecture.toObject(),
      ...req.body,
      _id: lecture._id // Keep same ID
    });

    // Manually trigger pre-save hook for conflict checking
    await updatedLecture.validate();
    await updatedLecture.save(); // This will trigger the pre-save hook

    // If no conflict, apply updates to original
    Object.assign(lecture, req.body);
    await lecture.save();

    res.json(lecture);
  } catch (err) {
    if (err.message.includes('already booked')) {
      return res.status(409).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Attended', 'Not Attended'].includes(status)) {
      return res.status(400).json({ error: "Invalid attendance status" });
    }

    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { attendanceStatus: status },
      { new: true }
    );

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete lecture
exports.deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.json({ message: "Lecture deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};