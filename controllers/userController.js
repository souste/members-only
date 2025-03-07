const pool = require("../db/pool");

const getJoinTheClubForm = (req, res) => {
  res.render("join-the-club-form");
};

module.exports = {
  getJoinTheClubForm,
};
