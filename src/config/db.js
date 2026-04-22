import mongoose from 'mongoose';

const connectDB = async (mongoURL) => {
  try {
    const conn = await mongoose.connect(mongoURL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
