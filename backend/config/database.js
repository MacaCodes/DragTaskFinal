const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Correctly access the environment variable
    const dbURI = process.env.MONGODB_URL;
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;