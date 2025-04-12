// models/Instructor.js
const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Optional password if instructors need login
  password: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Instructor", instructorSchema);
