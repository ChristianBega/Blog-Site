const { AuthenticationError } = require("@apollo/server");
const { User, Reactions, BlogPosts } = require("../models");
// const TotalSpending = require("../models/TotalSpending");
// const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    // Finds all users
    Users: async () => {
      return User.find();
    },
    // Find a single user
    User: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // Finds all blog posts
    BlogPost: async () => {
      return BlogPosts.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password });
    },

    // removeUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId });
    // },

    addComment: async (parent, { blogPostId, commentText }) => {
      return BlogPosts.findOneAndUpdate(
        { _id: blogPostId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeComment: async (parent, { blogPostId, commentId }) => {
      return BlogPosts.findOneAndUpdate({ _id: blogPostId }, { $pull: { comments: { _id: commentId } } }, { new: true });
    },
  },
};

module.exports = resolvers;
