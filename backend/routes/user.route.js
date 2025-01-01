const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, getUserProfile, logout } = require("../controllers/user.controller");
const authUser = require("../middlewares/auth.middleware");

router.get("/", ( req, res, next ) => {

});

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"), 
    body("firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"), 
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], registerUser);

router.post("/login", [
    body("email").isEmail().isLength({ min: 5 }).withMessage("Invalid email"), 
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginUser);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", logout);

module.exports = router;
