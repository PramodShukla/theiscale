const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.post("/signup", controller.createUser);

module.exports = router;
