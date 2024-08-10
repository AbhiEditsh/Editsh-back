// resumeController.js
require("dotenv").config();
const Resume = require("../model/resume");

const ResumeController = async (req, res) => {
    try {
        const { fullName, email, mobile, position, resumeImage } = req.body;

        const existingUser = await Resume.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists",
                success: false,
            });
        }

        const newUser = new Resume({ fullName, email, mobile, position, resumeImage });
        await newUser.save();

        return res.status(201).send({
            message: "Cv sent successfully",
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

const ResumegetController = async (req, res) => {
    try {
        const resumes = await Resume.find({});
        return res.status(200).send({
            message: "Resumes retrieved successfully",
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



module.exports = { ResumeController, ResumegetController };
