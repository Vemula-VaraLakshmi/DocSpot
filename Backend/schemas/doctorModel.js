const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: String,
  fullname: String,
  email: String,
  phone: String,
  specialization: String,
  status: { type: String, default: 'pending' },
  experience: String,
  fees: Number,
  timings: [String],
  profileImage: { type: String, default: '' },
  bio: { type: String, default: '' },
  linkedIn: { type: String, default: '' }
});

module.exports = mongoose.model('Doctor', doctorSchema);
