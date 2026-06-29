import mongoose from 'mongoose';
import serverless from 'serverless-http';
import app from '../src/app.js';
import { config } from '../src/config/index.js';

let connectionAttempted = false;

function connectDatabase() {
  if (connectionAttempted) return;

  connectionAttempted = true;
  mongoose.connect(config.MONGODB_URI, {
    tlsInsecure: true,
    serverSelectionTimeoutMS: 5000,
  }).catch(() => {});
}

const handler = serverless(app);

export default async function benHandler(request, response) {
  connectDatabase();
  return handler(request, response);
}
