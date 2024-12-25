// resume.js

const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  ClientImage: {
    type: String,
    required: true,
  },
  ClientName: {
    type: String,
  },
  Review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
