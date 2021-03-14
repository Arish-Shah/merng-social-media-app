import { gql } from "apollo-server-express";
import bcrypt from "bcryptjs";

import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { validateRegister } from "../../util/validators.js";

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput): UserResponse
    login(username: String!, password: String!): UserResponse
    logout: Boolean!
  }

  type UserResponse {
    user: User
    errors: FieldError
  }

  type User {
    id: ID!
    email: String!
    username: String!
    posts: [Post!]!
    createdAt: Date!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }
`;

export const resolvers = {
  Query: {
    me: (_, __, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        return null;
      }
      return User.findById(userID);
    },
  },
  Mutation: {
    login: async (_, { username, password }, { req }) => {
      const user = await User.findOne({ username });
      if (!user) {
        return {
          errors: {
            username: "not found",
          },
        };
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return {
          errors: {
            password: "incorrect",
          },
        };
      }

      req.session.userID = user.id; // setting session cookie
      return {
        user,
      };
    },
    register: async (_, { input }, { req }) => {
      const errors = validateRegister(input);
      if (errors) {
        return {
          errors,
        };
      }

      try {
        const user = await User.create({ ...input });
        req.session.userID = user.id; // setting session cookie
        return {
          user,
        };
      } catch (error) {
        const message = error.message;
        if (message.includes("dup key")) {
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
    logout: (_, __, { req, res }) => {
      return new Promise((resolve) => {
        return req.session.destroy((err) => {
          if (err) {
            resolve(false);
          }
          res.clearCookie(process.env.COOKIE_NAME);
          resolve(true);
        });
      });
    },
  },
  User: {
    posts: (parent) => {
      return Post.find({ creatorID: parent.id });
    },
  },
};
