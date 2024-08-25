const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/study", (req, res) => {
  return res.render("study");
});

module.exports = router;
