const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/join-the-club", userController.getJoinTheClubForm);
// router.post("/join-the-club", userController.postSecretCode);

module.exports = router;
