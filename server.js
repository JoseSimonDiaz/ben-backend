import app from './src/app.js';
import { connectDatabase, databaseConnected } from './src/config/db.js';
import { config } from './src/config/index.js';
import { info, warn, error } from './src/utils/logger.js';

await connectDatabase();

if (databaseConnected) {
  info('Base de datos conectada');
} else {
  warn('Base de datos NO conectada — el servidor funcionará sin persistencia');
}

app.listen(config.PORT, () => {
  info(`Servidor andando en el puerto ${config.PORT}`);
});

process.on('uncaughtException', (uncaughtError) => {
  error(`Excepción no capturada: ${uncaughtError.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (rejectionReason) => {
  error(`Promesa rechazada sin manejar: ${rejectionReason}`);
  process.exit(1);
});
