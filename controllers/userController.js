const pool = require("../db/pool");
require("dotenv").config();

const getJoinTheClubForm = (req, res) => {
  res.render("join-the-club-form");
};

// const postSecretCode = (req, res) => {
//   try {
//     const secret = req.body.secret;
//     if (secret === process.env.SESSION_SECRET) {
//       console.log("this needs to be updated after login");
//     }
//   } catch (err) {}
// };

module.exports = {
  getJoinTheClubForm,
};
