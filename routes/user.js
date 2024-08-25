const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controller/user");
const router = express.Router();

router.post("/create", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/", handleUserLogin);

module.exports = router;
