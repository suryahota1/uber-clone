const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        minlength: [3, "Code must be at least 3 characters long"]
    },
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Code must be at least 3 characters long"]
    },
    color: {
        type: String,
        required: true,
        minlength: [3, "Color must be at least 3 characters long"]
    },
    capacity: {
        type: Number,
        required: true,
        min: [2, "Minimum capacity should be 2"]
    },
    type: {
        type: String,
        enum: ["Car", "Auto", "Bike"]
    }
});

module.exports.vehicleSchema = vehicleSchema;
module.exports.vehicleModel = mongoose.model("Vehicle", vehicleSchema);