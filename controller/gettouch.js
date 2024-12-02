require("dotenv").config();
const nodemailer = require("nodemailer");
const GetTouchUser = require("../model/gettouch");

const GetTouchController = async (req, res) => {
  try {
    const { fullName, email, mobile, projectDescription, budget, document } =
      req.body;

    const existingUser = await GetTouchUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const newUser = new GetTouchUser({
      fullName,
      email,
      mobile,
      projectDescription,
      budget,
      document,
    });
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "editshtech@gmail.com",
      subject: "New Contact Form Submission",
      text: `Dear Team,

A new contact form has been submitted. Here are the details:

Full Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Project Description: ${projectDescription}
Budget: ${budget}
Resume Image URL: ${document ? document : "No resume image uploaded"}

Best regards,
Your Application`,
    };

    await transporter.sendMail(mailOptions);
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


