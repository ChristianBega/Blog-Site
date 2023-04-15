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
  comments: [
    {
      // creator: {
      //   type: String,
      //   required: true,
      //   trim: true,
      // },
      commentText: {
        type: String,
        required: "You need to leave a comment!",
        minLength: 1,
        maxLength: 280,
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
