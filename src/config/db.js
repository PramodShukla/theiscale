const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/iscale");
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("MongoDB Error ", error);
  }
};

module.exports = connectDB;