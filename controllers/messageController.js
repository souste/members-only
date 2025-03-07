const pool = require("../db/pool");

const messages = "This is just a placeholder so far!";

const getAllMessages = (req, res) => {
  res.render("index", { messages });
};

module.exports = {
  getAllMessages,
};
