const { body, validationResult } = require("express-validator");

const pool = require("../db/pool");

const getSignUpForm = (req, res) => {
  res.render("sign-up-form", { errors: [] });
};

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
  body("first_name").trim().isAlpha().withMessage(`First name ${alphaErr}`),
  body("last_name").trim().isAlpha().withMessage(`Last Name ${alphaErr}`),
  body("username").trim(),
  body("password").trim().isLength({ min: 6, max: 20 }).withMessage(`Password ${lengthErr}`),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];

const postNewUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", {
      errors: errors.array(),
    });
  }
  try {
    const { first_name, last_name, username, password } = req.body;
    console.log(req.body);

    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
      first_name,
      last_name,
      username,
      password,
    ]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getSignUpForm,
  validateUser,
  postNewUser,
};
