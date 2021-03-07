const Query = require("./Query");
const Mutation = require("./Mutation");
const AuthPayload = require("./AuthPayload");
const Post = require("./Post");

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Post,
};

module.exports = resolvers;
