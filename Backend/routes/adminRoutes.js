const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getAllDoctors,
  updateDoctorStatus
} = require("../controllers/adminC");

// Get all appointment bookings
router.get("/appointments", getAllAppointments);

// Get all doctor applications
router.get("/doctors", getAllDoctors);

// Approve or reject a doctor
router.post("/doctors/status/:id", updateDoctorStatus);

module.exports = router;
