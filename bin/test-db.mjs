import mongoose from 'mongoose';
import { config } from '../src/config/index.js';

async function testDatabaseConnection() {
  const targetUri = process.argv[2] || config.mongoUri;

  console.log(`\n🔌 Testing MongoDB connection...`);
  console.log(`   URI: ${targetUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}\n`);

  try {
    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    const adminDb = mongoose.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();

    console.log(`   ✅ Connected successfully`);
    console.log(`   📦 MongoDB version: ${serverInfo.version}`);
    console.log(`   🗄️  Database: ${mongoose.connection.db.databaseName}\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log(`   ❌ Connection failed`);
    console.log(`   ⚠️  ${error.message}\n`);
    console.log(`   Possible solutions:`);
    console.log(`   1. Install MongoDB locally: https://www.mongodb.com/try/download/community`);
    console.log(`   2. Use Docker: docker run -d -p 27017:27017 mongo`);
    console.log(`   3. Use MongoDB Atlas (free): https://www.mongodb.com/atlas`);
    console.log(`   4. Update MONGODB_URI in .env file to point to your instance\n`);
    process.exit(1);
  }
}

testDatabaseConnection();
