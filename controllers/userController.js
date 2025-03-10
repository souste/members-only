const pool = require("../db/pool");
require("dotenv").config();

const getJoinTheClubForm = (req, res) => {
  res.render("join-the-club-form");
};

const postSecretCode = async (req, res) => {
  try {
    const secret = req.body.secret;

    if (secret === process.env.SESSION_SECRET) {
      await pool.query(
        `UPDATE users
        SET membership_status = $1 WHERE id = $2`,
        [true, req.user.id]
      );
      res.redirect("/");
    } else {
      req.flash("error", "Incorrect secret code!");
      return res.redirect("/user/join-the-club");
    }
  } catch (err) {
    console.error("Error fetching the user");
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getJoinTheClubForm,
  postSecretCode,
};
