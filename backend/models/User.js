const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  walletBalance: {
    type: Number,
    default: 10000 // Each user starts with $10,000 virtual balance
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
