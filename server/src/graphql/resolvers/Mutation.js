const { AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Post = require("../../models/Post");
const { validateRegister, validatePost } = require("../../utils/validator");

const Mutation = {
  createPost: async (_, args, context) => {
    const { userID } = context;
    if (!userID) {
      throw new AuthenticationError("Unauthenticated");
    }

    const errors = validatePost(args.input);
    if (errors) {
      return {
        errors,
      };
    }

    const post = await Post.create({ ...args.input, creator: userID });
    return {
      post,
    };
  },
  login: async (_, args) => {
    const user = await User.findOne({ username: args.username });
    if (!user) {
      return {
        errors: {
          username: "not found",
        },
      };
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return {
        errors: {
          password: "incorrect",
        },
      };
    }
    return {
      user,
    };
  },
  register: async (_, args) => {
    const errors = validateRegister(args.input);

    if (errors) {
      return {
        errors,
      };
    }
    try {
      const user = await User.create({ ...args.input });
      return {
        user,
      };
    } catch (error) {
      const message = error.message;
      if (message.includes("duplicate key")) {
        const key = message.substring(
          message.indexOf("{") + 2,
          message.lastIndexOf(":")
        );
        return {
          errors: {
            [key]: "already exists",
          },
        };
      }
      throw error;
    }
  },
};

module.exports = Mutation;
