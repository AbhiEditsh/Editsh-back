const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  happyClients: {
    type: Number,
    required: true,
    min: [0, "Must be a positive number"],
  },
  projects: {
    type: Number,
    required: true,
    min: [0, "Must be a positive number"],
  },
  hardWorkers: {
    type: Number,
    required: true,
    min: [0, "Must be a positive number"],
  },
  hoursSpent: {
    type: Number,
    required: true,
    min: [0, "Must be a positive number"],
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
