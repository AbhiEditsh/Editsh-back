const express = require("express");
const { BlogController, BlogGetController, BlogDeleteController, BlogGetSingleController } = require("../controller/blogs");


const BlogRouter = express.Router();


BlogRouter.post("/add", BlogController);
BlogRouter.get("/view", BlogGetController);
BlogRouter.get("/:id", BlogGetSingleController );
BlogRouter.delete("/:id", BlogDeleteController );


module.exports = BlogRouter; 

