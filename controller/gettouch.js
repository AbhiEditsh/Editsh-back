require("dotenv").config();
const nodemailer = require("nodemailer");
const GetTouchUser = require("../model/gettouch");

const GetTouchController = async (req, res) => {
  try {
    const { name, email, mobile, service, message } = req.body;

    // Check if the user already exists
    const existingUser = await GetTouchUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    // Save the new user
    const newUser = new GetTouchUser({ name, email, mobile, service, message });
    await newUser.save();

    // Set up NodeMailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email options
    const mailOptions = {
      from: email,
      to: "editshtech@gmail.com",
      subject: "Thank you for getting in touch!",
      text: `Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Here are the details you provided:
Name: ${name}
Email: ${email}
Mobile: ${mobile}
Service: ${service}
Message: ${message}

Best regards,
Editsh`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(201).send({
      message: "Contact sent successfully and email notification sent",
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
