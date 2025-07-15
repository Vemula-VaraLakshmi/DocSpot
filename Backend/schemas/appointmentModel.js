const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorInfo: Object,
  userInfo: Object,
  date: Date,
  document: String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
