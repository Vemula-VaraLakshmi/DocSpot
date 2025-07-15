const Doctor = require("../schemas/doctorModel");

// Register a doctor
exports.registerDoctor = async (req, res) => {
  try {
    const {
      userId,
      fullname,
      email,
      phone,
      specialization,
      experience,
      fees,
      timings
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).send("Doctor already exists");

    const newDoctor = new Doctor({
      userId,
      fullname,
      email,
      phone,
      specialization,
      experience,
      fees,
      timings: timings?.split(',').map(t => t.trim()) // ✅ Ensure it's array
    });

    await newDoctor.save();
    res.status(201).send("Doctor registered successfully");
  } catch (err) {
    console.error("Error registering doctor:", err);
    res.status(500).send("Server error");
  }
};

// Get list of all doctors
exports.getDoctorList = async (req, res) => {
  try {
      const doctors = await Doctor.find({ status: 'approved' });
     console.log("✅ Doctors Sent:", doctors); 
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Error fetching doctor list:", err);
    res.status(500).send("Server error");
  }
};

// Get individual doctor profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.params.userId });
    if (!doctor) return res.status(404).send("Doctor not found");
    res.status(200).json(doctor);
  } catch (err) {
    console.error("Error fetching doctor profile:", err);
    res.status(500).send("Server error");
  }
};

// Update doctor profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const {
      fullname,
      phone,
      specialization,
      experience,
      fees,
      timings
    } = req.body;

    const profileImage = req.file ? req.file.filename : undefined;

    const updateFields = {
      fullname,
      phone,
      specialization,
      experience,
      fees,
      timings: timings?.split(',').map(t => t.trim()) // ✅ Ensure it's array
    };

    if (profileImage) updateFields.profileImage = profileImage;

    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateFields, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error("Update doctor profile failed:", err);
    res.status(500).send("Failed to update doctor profile");
  }
};
