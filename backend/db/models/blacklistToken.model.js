const { mongoose } = require("mongoose");

const backlistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expiresIn: 86400
    }
});

module.exports = mongoose.model("BacklistToken", backlistTokenSchema);