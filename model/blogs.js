const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  technology: {
    type: String,
  },
  blogImage: {
    type: String,
  },
  date: {
    type: Date,
  },
  authorName: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  blogTitle: {
    type: String,
  },
  blogDescription: {
    type: String,
  },
  category: {
    String
  },
  otherDetails: {
    type: String,
  }
});

const Blogs = mongoose.model('Blog', blogSchema);

module.exports = Blogs;