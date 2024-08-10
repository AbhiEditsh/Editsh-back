const express = require("express");
const { commentController, commentGetController } = require("../controller/comment");


const CommentRouter = express.Router();


CommentRouter.post("/add", commentController);
CommentRouter.get("/:blogId", commentGetController);


module.exports = CommentRouter; 

