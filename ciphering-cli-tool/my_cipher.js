import { argsCheck, repeatCheck, configCheck } from './src/validation.js';
import { cipher, streamSwitcher } from './src/streams.js';
import { args } from './src/parser.js';
import { argv } from 'process';

process.on('SIGINT', () => {
  process.exit(1);
});

configCheck(argv);
repeatCheck(argv);
argsCheck(args);
streamSwitcher(args);
cipher();
