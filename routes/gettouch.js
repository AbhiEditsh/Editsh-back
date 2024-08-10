const express = require("express");
const { GetTouchController, GetTouchgetController } = require("../controller/gettouch");


const GetTouchRouter = express.Router();


GetTouchRouter.post("/add", GetTouchController);
GetTouchRouter.get("/view", GetTouchgetController);


module.exports = GetTouchRouter; 

