const { Router } = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
const messageController = require("../controllers/messageController");

module.exports = router;

router.get("/create", messageController.createMessageGet);
