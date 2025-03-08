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

module.exports = router;
