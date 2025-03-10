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

module.exports = {
  getAllMessages,
  createMessageGet,
};
