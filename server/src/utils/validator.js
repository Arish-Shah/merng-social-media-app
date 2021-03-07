const validateRegister = (input) => {
  const errors = {};

  if (!input.email.includes("@")) {
    errors.email = "invalid email";
  }
  if (input.username.length < 3 || input.username.length > 20) {
    errors.username = "3-20 characters";
  }
  if (input.password.length < 3) {
    errors.password = "min 8 characters";
  }
  return Object.keys(errors).length ? errors : null;
};

const validatePost = (input) => {
  const errors = {};

  if (input.title.length < 1) {
    errors.title = "cannot be empty";
  }
  if (input.body.length < 1) {
    errors.body = "cannot be empty";
  }
  return Object.keys(errors).length ? errors : null;
};

module.exports = {
  validateRegister,
  validatePost,
};
