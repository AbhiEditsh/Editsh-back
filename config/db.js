const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function DbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = DbConnection;
