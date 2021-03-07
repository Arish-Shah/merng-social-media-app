const Post = require("../../models/Post");
const User = require("../../models/User");

const Query = {
  me: (_, __, context) => {
    const { userID } = context;
    if (!userID) {
      return null;
    }
    return User.findById(userID);
  },
  posts: () => {
    return Post.find();
  },
};

module.exports = Query;
