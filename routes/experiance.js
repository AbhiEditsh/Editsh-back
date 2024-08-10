const express = require("express");
const {
  ExperienceController,
  ExperienceGetController,
  ExperienceUpdateController,
  ExperienceDeleteController,
} = require("../controller/experince");

const ExperienceRouter = express.Router();

ExperienceRouter.post("/add", ExperienceController);
ExperienceRouter.get("/view", ExperienceGetController);
ExperienceRouter.put("/:id", ExperienceUpdateController);
ExperienceRouter.delete("/:id", ExperienceDeleteController);
module.exports = ExperienceRouter;
