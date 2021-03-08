const { AuthenticationError } = require("apollo-server-errors");

const Like = require("../../models/Like");
const Post = require("../../models/Post");

const LikeResolver = {
  Mutation: {
    like: async (_, args, { userID }) => {
      if (!userID) {
        throw new AuthenticationError("Unauthenticated");
      }

      const post = await Post.findById(args.postID);
      if (!post) {
        return false;
      }
      const isLiked = await Like.findOne({
        post: args.postID,
        creator: userID,
      });
      if (isLiked) {
        isLiked.delete();
        return true;
      } else {
        await Like.create({
          post: args.postID,
          creator: userID,
        });
        return true;
      }
    },
  },
};

module.exports = LikeResolver;
