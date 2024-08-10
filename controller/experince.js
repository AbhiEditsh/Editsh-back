require("dotenv").config();
const Experience = require("../model/experiance");

const ExperienceController = async (req, res) => {
  try {
    const { happyClients, projects, hardWorkers, hoursSpent } = req.body;

    if (!happyClients || !projects || !hardWorkers || !hoursSpent) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const newExperience = new Experience({
      happyClients,
      projects,
      hardWorkers,
      hoursSpent,
    });

    await newExperience.save();

    return res.status(201).send({
      message: "Experience created successfully",
      data: {
        experience: newExperience,
      },
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error processing request",
      success: false,
    });
  }
};
const ExperienceGetController = async (req, res) => {
  try {
    const experiences = await Experience.find({});

    if (experiences.length === 0) {
      return res.status(404).send({
        message: "No experience records found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Experience records retrieved successfully",
      data: experiences,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error retrieving experience records",
      success: false,
    });
  }
};

const ExperienceDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res.status(404).send({
        message: "Experience not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Experience deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error deleting experience",
      success: false,
    });
  }
};

const ExperienceUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { happyClients, projects, hardWorkers, hoursSpent } = req.body;

    if (!happyClients || !projects || !hardWorkers || !hoursSpent) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { happyClients, projects, hardWorkers, hoursSpent },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).send({
        message: "Experience not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Experience updated successfully",
      data: updatedExperience,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error updating experience",
      success: false,
    });
  }
};

module.exports = {
  ExperienceController,
  ExperienceGetController,
  ExperienceUpdateController,
  ExperienceDeleteController,
};
