const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  applyForPosition:{
    type:String,
    required:true,
  },
  currentCompanyName:{
    type:String,
    required:true
  },
  year:{
    type:String,
    required:true
  },
  month: {
    type: String,
    required: true,
  },
  currentSalary: {
    type: String,
    required: true,
  },
  expectedSalary: {
    type: String,
    required: true,
  },
  resumeImage: {
    type: String,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
