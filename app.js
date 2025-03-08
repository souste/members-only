const express = require("express");
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/pool");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Authentication Members app - listening on port ${PORT}`);
});
