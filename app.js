const express = require("express");
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

const PORT = process.env.PORT || 3000;

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`My Authentication Members app - listening on port ${PORT}`);
});
