const mongoose = require("mongoose");

function connectDb () {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log("Successfully connected to db");
    }).catch(( error ) => {
        console.error(error);
    });
}

module.exports = connectDb;