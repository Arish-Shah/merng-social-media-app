const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const Like = require("../../models/Like");
const { validatePost } = require("../../utils/validator");

const PostResolver = {
  Post: {
    creator: (parent) => {
      // use dataloader here
      return User.findById(parent.creator);
    },
    comments: (parent) => {
      return Comment.find({ post: parent.id });
    },
    commentsCount: (parent) => {
      return Comment.count({ post: parent.id });
    },
    isLiked: async (parent, _, { userID }) => {
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const isLiked = await Like.findOne({
        post: parent.id,
        creator: userID,
      });
      return !!isLiked;
    },
    likesCount: (parent) => {
      return Like.count({ post: parent.id });
    },
  },
  Query: {
    posts: () => {
      return Post.find();
    },
    post: (_, args) => {
      return Post.findById(args.postID);
    },
  },
  Mutation: {
    createPost: async (_, args, { userID }) => {
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
    deletePost: async (_, args, { userID }) => {
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const post = await Post.findById(args.id);
      if (post && post.creator.toString() === userID) {
        await post.delete();
        return true;
      }
      return false;
    },
  },
};

module.exports = PostResolver;
