require("dotenv").config();
const Termpolicy = require("../model/TemPolicy");

const TermpolicyController = async (req, res) => {
  try {
    const { Term, Policy } = req.body;
    const blog = new Termpolicy({ Term, Policy });
    await blog.save();

    return res.status(201).send({
      message: "Term Policy added successfully...",
      data: blog,
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

const TermpolicyGetController = async (req, res) => {
  try {
    const termPolicies = await Termpolicy.find({});
    return res.status(200).send({
      message: "Term Policy retrieved successfully",
      data: termPolicies,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      message: "Error retrieving term policies", 
      error: err.message,
      success: false 
    });
  }
};

module.exports = { TermpolicyController, TermpolicyGetController };
