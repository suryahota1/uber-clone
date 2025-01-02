const blacklistTokenModel = require("../db/models/blacklistToken.model");
const captainModel = require("../db/models/captain.model");
const userModel = require("../db/models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async function ( req, res, next ) {
    try {
        console.log("req.cookies", req.cookies);
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];

        if ( !token ) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlackListedToken = await blacklistTokenModel.findOne({ token });
        if ( isBlackListedToken ) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();
    } catch ( err ) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const authCaptain = async function ( req, res, next ) {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];

        if ( !token ) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlackListedToken = await blacklistTokenModel.findOne({ token });
        if ( isBlackListedToken ) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        next();
    } catch ( err ) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { authUser, authCaptain };