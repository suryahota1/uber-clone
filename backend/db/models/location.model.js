const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports.LocationSchema = LocationSchema;
module.exports.LocationModel = mongoose.model("Location", LocationSchema);