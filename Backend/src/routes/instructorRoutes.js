const express = require("express");
const router = express.Router();
const {
  createInstructor,
  getAllInstructors,
  getInstructor,
  updateInstructor,
  deleteInstructor,
  loginUser
} = require("../controllers/instructorController");

router.post("/login", loginUser);
// CRUD routes
router.post("/", createInstructor);
router.get("/", getAllInstructors);
router.get("/:id", getInstructor);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);

module.exports = router;