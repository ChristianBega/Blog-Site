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

    //! Todo - verify queryMe for finding current user is working
    // Finds the client side user and their context (data)
    Me: async (parent, args, contextValue) => {
      console.log("context", contextValue);
      if (context) {
        return User.findOne({ _id: context.user._id });
      }
      throw new GraphQLError("You need to be logged in!");
    },

    // Finds all blog posts
    BlogPosts: async () => {
      return BlogPosts.find();
    },
    // Find a single blog post
    BlogPost: async (parent, { blogId }) => {
      return BlogPosts.findOne({ _id: blogId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      // Expected - {username, email, password} and jwt token
      return { user, token };
    },
    //! removeUser returns null in apollo sandbox and wont update database...
    // removeUser: async (parent, { userId }) => {
    //   return User.findOneAndDelete({ _id: userId }, { $pull: { user: { _id: userId } } }, { new: true });
    // },
    //! create a Update User resolver

    //! Add user socials
    addSocial: async (parent, { userId, socialLink, socialPlatform }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { socials: { socialLink, socialPlatform } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    // Login Resolver
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

    // Add comment
    addComment: async (parent, { blogPostId, commentText, creatorId, creator }) => {
      return BlogPosts.findOneAndUpdate(
        { _id: blogPostId },
        {
          $addToSet: { comments: { commentText, creatorId, creator } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    // Remove comment
    removeComment: async (parent, { blogPostId, commentId }) => {
      return BlogPosts.findOneAndUpdate({ _id: blogPostId }, { $pull: { comments: { _id: commentId } } }, { new: true });
    },

    //! create update comment resolver

    //! create an Add blog post resolver
    addBlogPost: async (parent, { blogPost, blogTitle, creator, creatorId }, context) => {
      return BlogPosts.create({ blogPost, blogTitle, creator, creatorId });
    },

    //! create an Update blog post resolver
    //! create a Remove blog post resolver

    //! create add like(reaction) resolver
    //! create remove like(reaction) resolver
  },
};

module.exports = resolvers;
