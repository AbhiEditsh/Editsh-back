require("dotenv").config();
const ContactUser = require("../model/contact");

const ContactController = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    const existingUser = await ContactUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new ContactUser({ name, email, mobile, subject, message });
    await newUser.save();

    return res.status(201).send({
      message: "Contact sent successfully",
      data: {
        user: newUser,
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
const ContactgetController = async (req, res) => {
  try {
    const contacts = await ContactUser.find({});
    return res.status(200).send({
      message: "Contacts retrieved successfully",
      data: contacts,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error retrieving contacts",
      success: false,
    });
  }
};

module.exports = { ContactController, ContactgetController };
