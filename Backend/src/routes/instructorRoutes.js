const express = require("express");
const router = express.Router();
const {
  createInstructor,
  getAllInstructors,
  getInstructor,
  updateInstructor,
  deleteInstructor
} = require("../controllers/instructorController");

// CRUD routes
router.post("/", createInstructor);
router.get("/", getAllInstructors);
router.get("/:id", getInstructor);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);

module.exports = router;