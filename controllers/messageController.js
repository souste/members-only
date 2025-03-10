const pool = require("../db/pool");

const getAllMessages = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT messages.id, messages.title, messages.content, messages.timestamp, users.username FROM messages JOIN users on messages.user_id = users.id ORDER BY messages.timestamp DESC"
    );

    res.render("index", { messages: result.rows, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching messages");
  }
};

const createMessageGet = (req, res) => {
  res.render("create-message-form");
};

const createMessagePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    await pool.query(
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

const deleteMessage = async (req, res) => {
  try {
    if (!req.user || !req.user.admin) return res.status(403).send("Unauthrosized: Admin access required");

    const messageId = req.params.id;
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting message");
  }
};

module.exports = {
  getAllMessages,
  createMessageGet,
  createMessagePost,
  deleteMessage,
};
