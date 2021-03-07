const User = require("../../models/User");

const Post = {
  creator: (parent) => {
    // use dataloader here
    return User.findById(parent.creator);
  },
};

module.exports = Post;
