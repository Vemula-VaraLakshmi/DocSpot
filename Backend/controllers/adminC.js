const Appointment = require("../schemas/appointmentModel");
const Doctor = require("../schemas/doctorModel");

// Fetch all appointment data
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send("Failed to fetch appointments");
  }
};

// Fetch all doctor applications
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send("Failed to fetch doctors");
  }
};

// Update doctor's approval status
exports.updateDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // expected values: 'approved', 'rejected'

    await Doctor.findByIdAndUpdate(id, { status });
    res.status(200).send("Doctor status updated");
  } catch (err) {
    res.status(500).send("Failed to update status");
  }
};
