// resumeRouter.js

const express = require("express");
const { ResumeController, ResumegetController } = require("../controller/resume");

const ResumeRouter = express.Router();

ResumeRouter.post("/add", ResumeController);
ResumeRouter.get("/view", ResumegetController);

module.exports = ResumeRouter;
