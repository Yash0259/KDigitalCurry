const Instructor = require("../Models/Instructor");

// Create Instructor
const createInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if instructor already exists
    const existing = await Instructor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Instructor with this email already exists" });
    }

    const instructor = new Instructor({ name, email, password });
    await instructor.save();

    res.status(201).json({ message: "Instructor created", instructor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all Instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch instructors", error: err.message });
  }
};

// Get single Instructor by ID
const getInstructor = async (req, res) => {
    try {
      const { id } = req.params;
      const instructor = await Instructor.findById(id);
      
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      
      res.status(200).json(instructor);
    } catch (err) {
      res.status(500).json({ 
        message: "Failed to fetch instructor", 
        error: err.message 
      });
    }
  };

// Update Instructor
const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Instructor.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Instructor not found" });

    res.status(200).json({ message: "Instructor updated", instructor: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete Instructor
const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Instructor.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Instructor not found" });

    res.status(200).json({ message: "Instructor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};

module.exports = {
  createInstructor,
  getAllInstructors,
  getInstructor,
  updateInstructor,
  deleteInstructor,
};
