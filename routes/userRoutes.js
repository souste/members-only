const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/join-the-club", userController.getJoinTheClubForm);

module.exports = router;
