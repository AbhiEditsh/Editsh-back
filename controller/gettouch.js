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
      html: `
        <!DOCTYPE html>
      <!DOCTYPE html>
<html>
  <head>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      .company-image img {
        width: 100%;
        height: 300px;
      }
      .content {
        padding: 20px;
      }
      .detail {
        margin: 10px 0;
      }
      .label {
        font-weight: bold;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #888;
      }
      .social-icons {
        display: flex;
        justify-content: center;
        gap: 15px;
      }

      .social-icons a {
        color: #000;
        font-size: 1.5rem;
        transition: color 0.3s ease;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <div class="company-image">
        <img
          src="https://i.postimg.cc/Pq1FLbt5/2024-07-04-1.jpg"
          alt="company-image"
        />
      </div>
      <div class="content">
        <p>Dear Editsh,</p>
        <div class="detail"><span class="label">Full Name:</span> ${fullName}</div>
        <div class="detail">
          <span class="label">Email:</span> ${email}
        </div>
        <div class="detail">
          <span class="label">Mobile:</span> ${mobile}
        </div>
        <div class="detail">
          <span class="label">Project Description:</span> ${projectDescription}
        </div>
        <div class="detail"><span class="label">Budget:</span> ${budget}</div>
        <div class="detail">
          <span class="label">Document:</span>
           ${
             document
               ? `<a href="${document}" target="_blank">View Document</a>`
               : "No Document uploaded"
           }
        </div>
      </div>
      <div class="footer">
        <p>Best regards,<br />Your Application</p>
        <div class="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61559358057599" aria-label="Facebook"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a href="https://www.instagram.com/editsh_technology/" aria-label="Instagram"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </body>
</html>

      `,
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
