// resumeRouter.js

const express = require("express");
const {
  TermpolicyController,
  TermpolicyGetController,
} = require("../controller/TemPolicy");

const TermpolicyRouter = express.Router();

TermpolicyRouter.post("/add", TermpolicyController);
TermpolicyRouter.get("/view", TermpolicyGetController);

module.exports = TermpolicyRouter;
