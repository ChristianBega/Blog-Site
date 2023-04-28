const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const blogPostSchema = new Schema({
  blogPost: {
    type: String,
    trim: true,
  },
  blogTitle: {
    type: String,
    trim: true,
  },
  creator: {
    type: String,
    required: true,
    trim: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: "You need to leave a comment!",
        minLength: 1,
        maxLength: 280,
      },
      creatorId: {
        type: String,
        required: true,
      },
      creator: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;
