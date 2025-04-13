const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // ✅ Added phone
  password: { type: String }, // Optional
}, { timestamps: true });

module.exports = mongoose.model("Instructor", instructorSchema);
