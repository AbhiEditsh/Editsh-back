const express = require("express");
const { ContactController, ContactgetController } = require("../controller/contact");


const ContactRouter = express.Router();


ContactRouter.post("/add", ContactController);
ContactRouter.get("/view", ContactgetController);


module.exports = ContactRouter; 

