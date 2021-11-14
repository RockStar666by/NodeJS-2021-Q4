import { argsCheck } from './src/validation.js';
import { cipher } from './src/streams.js';

process.on('SIGINT', () => {
  process.exit(1);
});

argsCheck();
cipher();
