import { argsCheck } from './src/validation.js';
import { cipher } from './src/streams.js';
import { args } from './src/parser.js';

process.on('SIGINT', () => {
  process.exit(1);
});

argsCheck(args);
cipher();
