const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`connection error in DB: ${error}`);
  }
};

module.exports = connection;
