const mongoose = require('mongoose');

const { mongoURL } = require('./env')
const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log("MongoDB connection established successfully");
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }

module.exports = connectDB;
