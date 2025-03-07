const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/sign-up", authController.getSignUpForm);
router.post("/sign-up", authController.validateUser, authController.postNewUser);

module.exports = router;
