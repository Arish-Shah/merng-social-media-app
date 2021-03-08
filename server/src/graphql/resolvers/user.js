const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { validateRegister } = require("../../utils/validator");
const { createToken } = require("../../utils/token");

const UserResolver = {
  User: {
    token: (parent) => {
      return createToken({
        userID: parent.id,
      });
    },
  },
  Query: {
    me: (_, __, context) => {
      const { userID } = context;
      if (!userID) {
        return null;
      }
      return User.findById(userID);
    },
  },
  Mutation: {
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
  },
};

module.exports = UserResolver;
