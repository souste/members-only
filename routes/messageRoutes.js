const { Router } = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
const messageController = require("../controllers/messageController");

router.get("/create", messageController.createMessageGet);
router.post("/create", messageController.createMessagePost);
router.post("/:id/delete", messageController.deleteMessage);

module.exports = router;
