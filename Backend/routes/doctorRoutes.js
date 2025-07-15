const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ✅ Import all required controller functions
const {
  registerDoctor,
  getDoctorList,
  getDoctorProfile,
  updateDoctorProfile
} = require("../controllers/doctorC");

// 🔒 File Upload Config for Profile Pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 🔄 Routes
router.post("/register", registerDoctor);
router.get("/list", getDoctorList);
router.get('/profile/:userId', getDoctorProfile);
router.put('/profile/:userId', updateDoctorProfile);
router.put('/update/:id', upload.single("profileImage"), updateDoctorProfile);

module.exports = router;
