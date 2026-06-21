import app from './src/app.js';
import { connectDatabase } from './src/config/db.js';
import { config } from './src/config/index.js';

await connectDatabase();

app.listen(config.port);
