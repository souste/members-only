const { Router } = require("express");
const router = Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/sign-up", authController.getSignUpForm);
router.post("/sign-up", authController.validateUser, authController.postNewUser);

router.get("/log-in", authController.getLogInForm);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/log-in",
    failureFlash: true,
  })
);

router.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out");
    res.redirect("/");
  });
});

module.exports = router;
