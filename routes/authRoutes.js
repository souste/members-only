const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const router = Router();
const authController = require("../controllers/authController");

router.get("/sign-up", authController.getSignUpForm);
router.post("/sign-up", authController.postNewUser);

module.exports = router;
