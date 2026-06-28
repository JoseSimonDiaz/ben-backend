import mongoose from 'mongoose';
import { config } from './index.js';

export let databaseConnected = false;

export async function connectDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      tlsInsecure: true,
      serverSelectionTimeoutMS: 5000,
    });
    databaseConnected = true;
  } catch {
    databaseConnected = false;
  }
}
