require('dotenv').config();
const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI

const Mongo_uri = MONGODB_URI
const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  };

module.exports = {connectDb}