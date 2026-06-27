import dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ben',
  NODE_ENVIRONMENT: process.env.NODE_ENV || 'development',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || '',
  API_AGENT_IA_KEY: process.env.API_AGENT_IA_KEY || '',
});
