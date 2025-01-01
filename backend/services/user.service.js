const userModel = require("../db/models/user.model");
const AuthenticationError = require("../errors/AuthenticationError");
const ValidationError = require("../errors/ValidationError");

async function registerUser ({ firstName, lastName, email, password }) {

    if ( !firstName || !email || !password ) {
        throw new ValidationError("Required fields not available");
    }

    const hashedPassword = await userModel.hashPassowrd(password);
    const user = userModel.create({
        firstName,
        lastName, 
        email, 
        password: hashedPassword
    });
    
    return user;
}

async function loginUser ({ email, password }) {
    if ( !email || !password ) {
        throw new ValidationError("Required fields not available");
    }

    const user = await userModel.findOne({ email }).select("+password");
    if ( !user ) {
        throw new AuthenticationError("Invalid email or password");
    }
    const doesPasswordMatch = user.comparePassword(password);
    if ( !doesPasswordMatch ) {
        throw new AuthenticationError("Invalid email or password");
    }
    return user;
}

module.exports = {
    registerUser,
    loginUser
};
