const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const readToken = (token) => {
  if (!token) {
    return null;
  }

  const { userID } = jwt.verify(token, process.env.JWT_SECRET);
  return userID;
};

module.exports = {
  createToken,
  readToken,
};
