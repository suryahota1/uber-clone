const express = require("express");
const { register, login, getProfile, logout } = require("../controllers/captain.controller");
const { body } = require("express-validator");
const { authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"), 
    body("firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"), 
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], register);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"), 
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], login);

router.get("/profile", authCaptain, getProfile);

router.get("/logout", logout);

module.exports = router;