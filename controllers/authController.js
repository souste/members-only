const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

const getSignUpForm = (req, res) => {
  res.render("sign-up-form", { errors: [] });
};

const alphaErr = "must only contain letters";
const lengthErr = "must be between 8 and 10 characters";

const validateUser = [
  body("first_name").trim().isAlpha().withMessage(`First name ${alphaErr}`),
  body("last_name").trim().isAlpha().withMessage(`Last Name ${alphaErr}`),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().isLength({ min: 8, max: 20 }).withMessage(`Password ${lengthErr}`),
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
    const { first_name, last_name, username } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = req.body.admin ? true : false;

    await pool.query(
      "INSERT INTO users (first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, username, hashedPassword, admin]
    );
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const getLogInForm = (req, res) => {
  res.render("log-in-form");
};

module.exports = {
  getSignUpForm,
  validateUser,
  postNewUser,
  getLogInForm,
};
