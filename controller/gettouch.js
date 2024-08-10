require("dotenv").config();
const GetTouchUser = require("../model/gettouch");

const GetTouchController = async (req, res) => {
  try {
    const { name, email, mobile, service, message } = req.body;

    const existingUser = await GetTouchUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new GetTouchUser({ name, email, mobile, service, message });
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
const GetTouchgetController = async (req, res) => {
  try {
    const contacts = await GetTouchUser.find({});
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

module.exports = { GetTouchController, GetTouchgetController };
