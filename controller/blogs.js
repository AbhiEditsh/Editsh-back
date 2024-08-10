require("dotenv").config();
const Blog = require("../model/blogs");

const BlogController = async (req, res) => {
    try {
        const { technology, blogImage, date, authorName, authorImage, blogTitle, blogDescription, category, otherDetails } = req.body;
        const blog = new Blog({ technology, blogImage, date, authorName, authorImage, blogTitle, blogDescription, category, otherDetails });
        await blog.save();
        
    return res.status(201).send({
        message: "Blogs add successfully...",
        data: blog,
        success: true,
      });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
          message: "Error processing request",
          success: false,
        });
    }
};
const BlogGetController = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const BlogDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).send({
                message: "Blog not found",
                success: false,
            });
        }

        return res.status(200).send({
            message: "Blog deleted successfully",
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error processing request",
            success: false,
        });
    }
};
const BlogGetSingleController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({
                message: "Blog not found",
                success: false,
            });
        }

        return res.status(200).send({
            message: "Blog retrieved successfully",
            data: blog,
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error processing request",
            success: false,
        });
    }
};
module.exports = { BlogController, BlogGetController ,BlogDeleteController,BlogGetSingleController};
