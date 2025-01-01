const blacklistTokenModel = require("../db/models/blacklistToken.model");
const userService = require("./../services/user.service");
const { validationResult } = require("express-validator");

async function registerUser ( req, res ) {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.registerUser(req.body);
        const token = user.generateAuthToken();
        res.status(201).json({
            user, 
            token
        });
    } catch ( err ) {
        const status = err.status ?? 500;
        const message = err.message ?? "Something went wrong";
        return res.status(status).json({
            message
        });
    }
}

async function loginUser ( req, res) {
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.loginUser(req.body);
        const token = user.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({
            token
        });
    } catch ( err ) {
        const status = err.status ?? 500;
        const message = err.message ?? "Something went wrong";
        return res.status(status).json({
            message
        });
    }
}

async function getUserProfile ( req, res ) {
    return res.status(200).json(req.user);
}

async function logout ( req, res ) {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    res.clearCookie("token");
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully"});
}

module.exports = { registerUser, loginUser, getUserProfile, logout };
