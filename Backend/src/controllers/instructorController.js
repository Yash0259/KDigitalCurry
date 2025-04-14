require('dotenv').config();
const Instructor = require("../Models/Instructor");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({
        message: "Admin login successful",
        user: {
          role: "admin",
          email,
        },
      });
    }

    // Check for instructor login
    const instructor = await Instructor.findOne({ email, password });

    if (!instructor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Instructor login successful",
      user: {
        role: "instructor",
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


const createInstructor = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body; // ✅ include phone

    // Check if instructor already exists
    const existing = await Instructor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Instructor with this email already exists" });
    }

    const instructor = new Instructor({ name, email, phone, password }); // ✅ include phone
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
  loginUser
};
