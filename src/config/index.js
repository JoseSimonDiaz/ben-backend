import dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ben',
  nodeEnvironment: process.env.NODE_ENV || 'development',
  adminApiKey: process.env.ADMIN_API_KEY || '',
});
