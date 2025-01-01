const blacklistTokenModel = require("../db/models/blacklistToken.model");
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

module.exports = authUser;