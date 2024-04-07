import mongoose, { mongo } from "mongoose";

const MONGOBD_URI = process.env.MONGOBD_URI;

const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGOBD_URI) throw new Error("MONGOBD_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGOBD_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
