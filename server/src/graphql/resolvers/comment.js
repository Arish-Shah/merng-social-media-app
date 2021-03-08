const { AuthenticationError } = require("apollo-server");
const Comment = require("../../models/Comment");

const Post = require("../../models/Post");
const User = require("../../models/User");
const { validateComment } = require("../../utils/validator");

const CommentResolver = {
  Comment: {
    creator: (parent) => {
      return User.findById(parent.creator);
    },
    post: (parent) => {
      return Post.findById(parent.post);
    },
  },
  Mutation: {
    createComment: async (_, args, { userID }) => {
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const errors = validateComment(args.body);
      if (errors) {
        return {
          errors,
        };
      }

      const post = await Post.findById(args.postID);
      if (post) {
        const comment = await Comment.create({
          body: args.body,
          creator: userID,
          post,
        });
        return {
          comment,
        };
      }
    },
    deleteComment: async (_, args, { userID }) => {
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }
      const comment = await Comment.findById(args.commentID);
      if (!comment || comment.creator.toString() !== userID) {
        return false;
      }
      await comment.delete();
      return true;
    },
  },
};

module.exports = CommentResolver;
