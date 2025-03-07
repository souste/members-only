const pool = require("../db/pool");

const getSignUpForm = (req, res) => {
  res.render("sign-up-form");
};

const postNewUser = async (req, res, next) => {
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
  postNewUser,
};
