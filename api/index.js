import mongoose from 'mongoose';
import app from '../src/app.js';
import { config } from '../src/config/index.js';

mongoose.connect(config.MONGODB_URI, {
  tlsInsecure: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
}).catch(() => {});

export default app;
