export const validateRegister = (input) => {
  const errors = {};

  if (!input.email.includes("@")) {
    errors.email = "invalid";
  }
  if (input.username.length < 3 || input.username.length > 20) {
    errors.email = "3-20 characters";
  }
  if (input.password.length < 3) {
    errors.password = "min 8 characters";
  }

  return Object.keys(errors).length ? errors : null;
};

export const validatePost = (input) => {
  const errors = {};

  if (!input.title.length) {
    errors.title = "required";
  }
  if (!input.body.length) {
    errors.body = "required";
  }

  return Object.keys(errors).length ? errors : null;
};
