const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const blogPostSchema = new Schema({
  blogPost: {
    type: String,
    trim: true,
  },
  creator: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;
