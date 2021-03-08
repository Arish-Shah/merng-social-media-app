const PostResolver = require("./Post");
const UserResolver = require("./user");
const CommentResolver = require("./comment");
const LikeResolver = require("./like");

const resolvers = {
  Query: {
    ...UserResolver.Query,
    ...PostResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...PostResolver.Mutation,
    ...CommentResolver.Mutation,
    ...LikeResolver.Mutation,
  },
  User: UserResolver.User,
  Post: PostResolver.Post,
  Comment: CommentResolver.Comment,
};

module.exports = resolvers;
