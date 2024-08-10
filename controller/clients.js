// resumeController.js
require("dotenv").config();
const ClientsUser = require("../model/clients");


const ClientController = async (req, res) => {
  try {
    const { companyName, logoImage } = req.body;



    const newUser = new ClientsUser({companyName, logoImage});
    await newUser.save();

    return res.status(201).send({
      message: "Client logo add successfully...",
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

const ClientgetController = async (req, res) => {
  try {
    const resumes = await ClientsUser.find({});
    return res.status(200).send({
      message: "Client logo retrieved successfully",
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
const ClientDeleteController = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const deletedClient = await ClientsUser.findByIdAndDelete(id);
  
      if (!deletedClient) {
        return res.status(404).send({
          message: "Client logo not found",
          success: false,
        });
      }
  
      return res.status(200).send({
        message: "Client logo deleted successfully",
        data: deletedClient,
        success: true,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        message: "Error deleting client logo",
        success: false,
      });
    }
  };

module.exports = { ClientController, ClientgetController,ClientDeleteController };
