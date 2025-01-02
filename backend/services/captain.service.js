const captainModel = require("../db/models/captain.model");
const AuthenticationError = require("../errors/AuthenticationError");
const ValidationError = require("../errors/ValidationError");

async function register ({ firstName, lastName, email, password, vehicle: { model, code, color, capacity, type }={}, location: { latitude, longitude }={} }) {

    if ( !firstName || !email || !password || !model || !code || !color || !capacity || !type || !latitude || !longitude ) {
        throw new ValidationError("Required fields not available");
    }

    const hashedPassword = await captainModel.hashPassowrd(password);
    const captain = captainModel.create({
        firstName,
        lastName, 
        email, 
        password: hashedPassword,
        vehicle: {model, code, color, capacity, type},
        location: {latitude, longitude}
    });
    
    return captain;
}

async function login ({ email, password }) {
    if ( !email || !password ) {
        throw new ValidationError("Required fields not available");
    }

    const captain = await captainModel.findOne({ email }).select("+password");
    if ( !captain ) {
        throw new AuthenticationError("Invalid email or password");
    }
    const doesPasswordMatch = captain.comparePassword(password);
    if ( !doesPasswordMatch ) {
        throw new AuthenticationError("Invalid email or password");
    }
    return captain;
}

module.exports = {
    register,
    login
};
