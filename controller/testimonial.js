require("dotenv").config();
const Testimonial = require("../model/testimonial");

const TestimonialController = async (req, res) => {
  try {
    const { ClientImage, ClientName, Review, rating } = req.body;
    if (!ClientImage || !ClientName || !Review || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new Testimonial({
      ClientImage,
      ClientName,
      Review,
      rating,
    });
    await newUser.save();
    return res.status(201).send({
      message: "Clients Reviews add successfully",
      data: newUser,
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

const TestimonialgetController = async (req, res) => {
  try {
    const resumes = await Testimonial.find({});
    return res.status(200).send({
      message: "Clients Reviews retrieved successfully",
      data: resumes,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error retrieving resumes",
      success: false,
    });
  }
};
const TestimonialDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).send({
        message: "Testimonial not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error deleting testimonial",
      success: false,
    });
  }
};

module.exports = {
  TestimonialController,
  TestimonialgetController,
  TestimonialDeleteController,
};
