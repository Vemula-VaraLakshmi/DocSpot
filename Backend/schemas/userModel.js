const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  isdoctor: { type: Boolean, default: false },
  notification: { type: Array, default: [] },
  type: { type: String, enum: ["user", "admin"], default: "user" }
});

module.exports = mongoose.model('User', userSchema);
