const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const User = require("../schemas/userModel");
const Appointment = require("../schemas/appointmentModel");
const Doctor = require("../schemas/doctorModel"); // ✅ required for doctor registration

// -------------------- REGISTER USER --------------------
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, type } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      type: type === "admin" ? "admin" : "user" // ✅ use "admin" for doctors
    });

    await newUser.save();

    // ✅ If doctor, add entry to doctors collection
    if (type === "admin") {
      const newDoctor = new Doctor({
        userId: newUser._id,
        fullname: name,
        email,
        phone,
        specialization: "General", // default values, can be edited later
        experience: "0",
        fees: 0,
        timings: []
      });
      await newDoctor.save();
    }

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Server Error");
  }
};

// -------------------- LOGIN USER --------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// -------------------- FILE UPLOAD MIDDLEWARE --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
exports.uploadMiddleware = upload.single("document");

// -------------------- BOOK APPOINTMENT --------------------
exports.bookAppointment = async (req, res) => {
  try {
    const { userInfo, doctorInfo, date } = req.body;
    const document = req.file?.filename || "";

    const newAppointment = new Appointment({
      userInfo: JSON.parse(userInfo),
      doctorInfo: JSON.parse(doctorInfo),
      date,
      document
    });

    await newAppointment.save();
    res.status(200).send("Appointment booked");
  } catch (err) {
    console.error(err);
    res.status(500).send("Booking failed");
  }
};

// -------------------- GET USER APPOINTMENTS --------------------
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const appointments = await Appointment.find({ "userInfo._id": userId });
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch appointments");
  }
};
