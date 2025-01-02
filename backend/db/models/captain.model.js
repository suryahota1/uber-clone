const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { vehicleSchema } = require("./vehicle.model");
const { LocationSchema } = require("./location.model");

const CaptainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be atleast 3 characters long"]
    }, 
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be atleast 3 characters long"], 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        minlength: [5, "Email must be atleast 3 characters long"], 
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    vehicle: {
        type: vehicleSchema,
        required: true
    },
    location: {
        type: LocationSchema
    }
});

CaptainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h"});
}

CaptainSchema.methods.comparePassword = async function ( password ) {
    return await bcrypt.compare(password, this.password);
}

CaptainSchema.statics.hashPassowrd = async function ( password ) {
    return await bcrypt.hash(password, 10);
}

CaptainSchema.set('toJSON', { 
    transform: function(doc, ret, options) { 
        delete ret.password; return ret;
    }
});

module.exports = mongoose.model("Captain", CaptainSchema);