const mongoose = require("mongoose");

let cached = global.__swmsMongoose;
if (!cached) {
  cached = global.__swmsMongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, { autoIndex: true })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
};

module.exports = connectDb;
