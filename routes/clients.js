const express = require("express");
const { ClientController, ClientgetController, ClientDeleteController } = require("../controller/clients");


const ClientRouter = express.Router();


ClientRouter.post("/add", ClientController);
ClientRouter.get("/view", ClientgetController);
ClientRouter.delete("/:id", ClientDeleteController);



module.exports = ClientRouter; 

