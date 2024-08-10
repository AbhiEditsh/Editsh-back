require('dotenv').config();
const Comment = require('../model/comment');

// Controller to handle adding a new comment
const commentController = async (req, res) => {
    try {
        const { name, comment, blog } = req.body;

        // Create a new Comment instance
        const newComment = new Comment({ name, comment, blog });

        // Validate the comment
        await newComment.validate();

        // Save the comment to the database
        await newComment.save();

        return res.status(201).send({
            message: "Comment added successfully...",
            data: newComment,
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to create comment', details: err.message });
    }
};

// Controller to handle fetching comments for a specific blog
const commentGetController = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve comments', details: err.message });
    }
};

module.exports = { commentController, commentGetController };
