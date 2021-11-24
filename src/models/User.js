const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  bio: String,
  phone: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
