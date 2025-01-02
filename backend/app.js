const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./db/db");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.routes");

const app = express();

connectDb();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", ( req, res ) => {
    res.send("Hello world");
});

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);

module.exports = app;