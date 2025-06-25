import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI is not defined in environment variables');
}

// Caching to avoid re-connecting on every API call
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "redef_ai"
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
