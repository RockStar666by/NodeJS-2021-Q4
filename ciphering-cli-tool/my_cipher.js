import { argsCheck, repeatCheck, configCheck } from './src/validation.js';
import {
  cipher,
  streamSwitcher,
  readStream,
  writeStream,
  callback1,
} from './src/streams.js';

import { args } from './src/parser.js';
import { argv } from 'process';

process.on('SIGINT', () => {
  process.exit(1);
});
console.log(args);
configCheck(argv);
repeatCheck(argv);
argsCheck(args);
const read = readStream(args);
const write = writeStream(args);
const transformArr = streamSwitcher(args);
cipher(read, transformArr, write, callback1);
