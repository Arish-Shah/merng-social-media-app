import { gql, AuthenticationError } from "apollo-server-express";

import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";
import Like from "../../models/Like.js";
import { validatePost } from "../../util/validators.js";

export const typeDefs = gql`
  extend type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(input: PostInput!): PostResponse!
    deletePost(postID: ID!): Boolean!
  }

  type PostResponse {
    post: Post
    errors: FieldError
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    creator: User!
    comments: [Comment!]!
    commentsCount: Int!
    likes: [Like!]!
    likesCount: Int!
    isLiked: Boolean!
    createdAt: Date!
  }

  input PostInput {
    title: String!
    body: String!
  }
`;

export const resolvers = {
  Query: {
    feed: () => {
      return Post.find().sort("-createdAt");
    },
    post: (_, { id }) => {
      return Post.findById(id);
    },
  },
  Mutation: {
    createPost: (_, { input }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const errors = validatePost(input);
      if (errors) {
        return {
          errors,
        };
      }

      const post = Post.create({ ...input, creatorID: userID });
      return {
        post,
      };
    },
    deletePost: async (_, { postID }, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }

      const post = await Post.findById(postID);
      if (!post || post.creatorID.toString() != userID) {
        return false;
      }

      await post.delete();
      await Comment.deleteMany({ postID });
      await Like.deleteMany({ postID });
      return true;
    },
  },
  Post: {
    creator: (parent) => User.findById(parent.creatorID),
    comments: (parent) => Comment.find({ postID: parent.id }),
    likes: (parent) => Like.find({ postID: parent.id }),
    likesCount: (parent) => Like.countDocuments({ postID: parent.id }),
    isLiked: async (parent, _, { req }) => {
      const { userID } = req.session;
      if (!userID) {
        return false;
      }
      const boolean = await Like.findOne({
        postID: parent.id,
        creatorID: userID,
      });
      return !!boolean;
    },
  },
};
