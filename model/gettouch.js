const mongoose = require("mongoose");

const getTouchSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  resumeImage: {
    type: String,
  },
});

const Contact = mongoose.model("GetTouch", getTouchSchema);

module.exports = Contact;
