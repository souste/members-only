const express = require("express");
const app = express();
const path = require("node:path");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use("/auth", authRoutes);
// app.use("/messages", messageRoutes);
// check if this should just be /

const messages = "This is just a placeholder so far!";

app.get("/", (req, res) => res.render("index", { messages }));
// need to replace this

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Authentication Members app - listening on port ${PORT}`);
});
