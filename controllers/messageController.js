const pool = require("../db/pool");

const messages = "This is just a placeholder so far!";

const getAllMessages = (req, res) => {
  try {
    // const messages = await pool.query("SELECT * FROM messages");
    // res.render("index", { messages: messages.rows, user: req.user });
    res.render("index", { user: req.user, messages });
  } catch (err) {
    res.status(500).send("Error fetching messages");
  }
};

const createMessageGet = (req, res) => {
  res.render("create-message-form");
};

const createMessagePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      `INSERT INTO messages (title, content, user_id)
  VALUES ($1, $2, $3)`,
      [title, content, req.user.id]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding message", err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllMessages,
  createMessageGet,
  createMessagePost,
};
