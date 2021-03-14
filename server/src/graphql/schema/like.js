import { gql, AuthenticationError } from "apollo-server-express";

import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Like from "../../models/Like.js";

export const typeDefs = gql`
  extend type Mutation {
    like(postID: ID!): Boolean!
  }

  type Like {
    post: Post!
    creator: User!
  }
`;

export const resolvers = {
  Mutation: {
    like: async (_, { postID }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }

      const post = await Post.findById(postID);
      if (!post) {
        throw new Error("Post not found");
      }

      const like = await Like.findOne({ postID, creatorID: userID });
      if (!like) {
        await Like.create({ postID, creatorID: userID });
      } else {
        await like.delete();
      }
      return true;
    },
  },
  Like: {
    post: (parent) => Post.findById(parent.postID),
    creator: (parent) => User.findById(parent.creatorID),
  },
};
