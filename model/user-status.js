const mongoose = require('mongoose');

const UserStatus = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('UserStatus', UserStatus);
