// resume.js

const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    mobile: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    resumeImage: {
        type: String,
    }
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
