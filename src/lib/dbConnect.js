import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      dbName: process.env.DB_NAME,
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log("Db connected");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
