const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h"});
}

userSchema.methods.comparePassword = async function ( password ) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassowrd = async function ( password ) {
    return await bcrypt.hash(password, 10);
}

userSchema.set('toJSON', { 
    transform: function(doc, ret, options) { 
        delete ret.password; return ret;
    }
});

module.exports = mongoose.model("User", userSchema);
