const { GraphQLError } = require("graphql");

const { User, Reactions, BlogPosts } = require("../models");
const { signToken } = require("../utils/auth");
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
    // Finds the client side user and their context (data)
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new GraphQLError("You need to be logged in!");
    },

    // Finds all blog posts
    BlogPost: async () => {
      return BlogPosts.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      // Expected - {username, email, password} and jwt token
      // console.log(user, token);
      return { user, token };
    },

    // removeUser returns null in apollo sandbox and wont update database...
    
    // removeUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId }, { $pull: { user: { _id: userId } } }, { new: true });
    // },

    login: async (parent, { email, password }) => {
      const userProfile = await User.findOne({ email });

      if (!userProfile) {
        // throw new AuthenticationError("No user profile with this email found!");
        throw new GraphQLError("No user with this email found!!", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const correctPw = await userProfile.isCorrectPassword(password);

      if (!correctPw) {
        // throw new AuthenticationError("Incorrect password!");
        throw new GraphQLError("Invalid credentials!! Check email or password", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const token = signToken(userProfile);
      return { token, userProfile };
    },

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
