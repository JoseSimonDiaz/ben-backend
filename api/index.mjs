import mongoose from 'mongoose';
import serverless from 'serverless-http';
import app from '../src/app.js';
import { config } from '../src/config/index.js';

let cachedConnection = false;

async function connectDatabase() {
  if (cachedConnection) return;

  try {
    await mongoose.connect(config.MONGODB_URI, {
      tlsInsecure: true,
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnection = true;
  } catch {
    cachedConnection = false;
  }
}

const handler = serverless(app);

export default async function benHandler(request, response) {
  await connectDatabase();
  return handler(request, response);
}
