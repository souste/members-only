const { Router } = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
// This should be used for the form
const messageController = require("../controllers/messageController");

module.exports = router;
