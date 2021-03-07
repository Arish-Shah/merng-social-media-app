const { createToken } = require("../../utils/token");

const AuthPayload = {
  token: (parent) => {
    return createToken({
      userID: parent.user.id,
    });
  },
};

module.exports = AuthPayload;
