const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsermodelSchema = new Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  last_name: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Usermodel = mongoose.model('Usermodel', UsermodelSchema);
module.exports = Usermodel;
