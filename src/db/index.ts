import mongoose from 'mongoose';

const connectionUrl = process.env.MONGO_DB_URL || '';
const dbName = process.env.MONGO_DB_NAME || '';
const dbPass = process.env.MONGO_PASS || '';
const dbUser = process.env.MONGO_USER || '';

const dbConfig = {
  dbName: dbName,
  auth: {
    username: dbUser,
    password: dbPass,
  },
};

export const db = async() =>
  mongoose
    .connect(connectionUrl, dbConfig)
    .then(() => console.log('DB Connected'))
    .catch((err: any) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
