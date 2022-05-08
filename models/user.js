const { Schema, model } = require('mongoose');

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  email: String,
  phone: String,
  intro: String,
  admin: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: new Date()
  }
});

module.exports = model('users', User);
