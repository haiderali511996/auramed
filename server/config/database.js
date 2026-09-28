const mongoose = require('mongoose');

async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI before starting AuraMed.');
  const dbName = process.env.MONGODB_DB_NAME || 'auramed';
  if (!/^auramed(?:_[a-z0-9_-]+)?$/.test(dbName)) {
    throw new Error('MONGODB_DB_NAME must be auramed or an auramed_ prefixed database.');
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });
  return mongoose.connection;
}
module.exports = { connectDatabase };
