const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  bookAppointment,
  uploadMiddleware,
  getUserAppointments,
} = require('../controllers/userC');

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Book appointment (with file upload)
router.post("/book", uploadMiddleware, bookAppointment);

// Get user's appointments
router.get("/appointments/:userId", getUserAppointments);

module.exports = router;
