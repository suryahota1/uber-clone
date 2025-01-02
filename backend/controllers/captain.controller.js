const blacklistTokenModel = require("../db/models/blacklistToken.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

async function register ( req, res ) {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const captain = await captainService.register(req.body);
        const token = captain.generateAuthToken();
        res.status(201).json({
            captain, 
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

async function login ( req, res) {
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const captain = await captainService.login(req.body);
        const token = captain.generateAuthToken();
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

async function getProfile ( req, res ) {
    return res.status(200).json(req.captain);
}

async function logout ( req, res ) {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    res.clearCookie("token");
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully"});
}

module.exports = { register, login, getProfile, logout };
