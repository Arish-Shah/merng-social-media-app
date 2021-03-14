import { gql, AuthenticationError } from "apollo-server-express";

import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

export const typeDefs = gql`
  extend type Mutation {
    createComment(body: String!, postID: ID!): CommentResponse!
    deleteComment(commentID: ID!): Boolean!
  }

  type CommentResponse {
    comment: Comment
    errors: FieldError
  }

  type Comment {
    id: ID!
    body: String!
    post: Post!
    creator: User!
    createdAt: Date!
  }
`;

export const resolvers = {
  Mutation: {
    createComment: async (_, { body, postID }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }

      if (!body.length) {
        return {
          errors: {
            body: "required",
          },
        };
      }

      // Check if post exists first
      const post = await Post.findById(postID);
      if (!post) {
        throw new Error("Post does not exist");
      }

      const comment = Comment.create({ body, postID, creatorID: userID });
      return {
        comment,
      };
    },
    deleteComment: async (_, { commentID }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const comment = await Comment.findById(commentID);
      if (!comment || comment.creatorID.toString() != userID) {
        return false;
      }
      await comment.delete();
      return true;
    },
  },
  Comment: {
    post: (parent) => {
      return Post.findById(parent.postID);
    },
    creator: (parent) => {
      return User.findById(parent.creatorID);
    },
  },
};
