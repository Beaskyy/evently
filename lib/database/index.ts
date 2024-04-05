import mongoose from "mongoose";

const MONGOBD_URI = process.env.MONGOBD_URI

let cached = (global as any).mongoose || {conn: null, promise: null}

export const connectToDatabase =  async () => {
  if (!cached.conn) {
    cached.conn = await mongoose.connect(MONGOBD_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cached.promise = cached.conn.promise()
  }
  return cached.promise
}