// resumeRouter.js

const express = require("express");
const {TechnologyController, TechnologygetController, TechnologyDeleteController } = require("../controller/technology");

const TechnologyRouter = express.Router();

TechnologyRouter.post("/add", TechnologyController);
TechnologyRouter.get("/view", TechnologygetController);
TechnologyRouter.delete("/:id", TechnologyDeleteController);

module.exports = TechnologyRouter;
