const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const router = Router();

// This should be used for the form
const authController = require("../controllers/authController");

module.exports = router;
