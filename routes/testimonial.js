// resumeRouter.js

const express = require("express");
const {TestimonialController, TestimonialgetController,TestimonialDeleteController } = require("../controller/testimonial");

const TestimonialRouter = express.Router();

TestimonialRouter.post("/add", TestimonialController);
TestimonialRouter.get("/view", TestimonialgetController);
TestimonialRouter.delete("/:id", TestimonialDeleteController);

module.exports = TestimonialRouter;
