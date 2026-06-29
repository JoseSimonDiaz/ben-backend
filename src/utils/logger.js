import { NODE_ENVIRONMENTS } from './errorTypes.js';

const isProduction = process.env.NODE_ENV === NODE_ENVIRONMENTS.PRODUCTION;

function formatTimestamp() {
  return new Date().toISOString();
}

export function info(message) {
  if (!isProduction) {
    console.log(`[${formatTimestamp()}] [INFO] ${message}`);
  }
}

export function warn(message) {
  console.warn(`[${formatTimestamp()}] [WARN] ${message}`);
}

export function error(message) {
  console.error(`[${formatTimestamp()}] [ERROR] ${message}`);
}
