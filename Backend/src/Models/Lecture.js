const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },  // Change to Date object
  endTime: { type: Date, required: true },    // Change to Date object
  attendanceStatus: { type: String, default: "Not Attended" }
}, { timestamps: true });

// Prevent overlapping lectures
lectureSchema.pre('save', async function(next) {
  const existing = await this.constructor.findOne({
    instructor: this.instructor,
    date: this.date,
    $or: [
      { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }
    ]
  });
  
  if (existing) return next(new Error('Instructor already booked at this time'));
  next();
});

module.exports = mongoose.model("Lecture", lectureSchema);
