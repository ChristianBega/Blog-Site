const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionsSchema = new Schema({
  // likedBlogPost: {
  //   type: Boolean,
  // },
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

const Reactions = model("Reactions", reactionsSchema);

module.exports = Reactions;
