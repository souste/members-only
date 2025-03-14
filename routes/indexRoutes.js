const { Router } = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

router.get("/", messageController.getAllMessages);

module.exports = router;
