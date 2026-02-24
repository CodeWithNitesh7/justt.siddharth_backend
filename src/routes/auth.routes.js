const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { login, logout } = require("../controller/auth.controller");

const router = express.Router();

// Login Route
router.post("/login", login);

// Logout Route (Protected)
router.get("/logout", auth, logout);
// me
router.get("/me", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;