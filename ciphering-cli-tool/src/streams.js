import { pipeline, Transform } from 'stream';
import { ReadCustomStream, WriteCustomStream } from './custom-streams.js';
import {
  encodeCaesar,
  encodeAtbash,
  encodeROT8,
  decodeCaesar,
  decodeROT8,
} from './ciphering.js';
import { args } from './parser.js';

const transformArr = [];
const argsArr = args.config.split('-');
const readStream =
  args.input !== null ? new ReadCustomStream(args.input) : process.stdin;
const writeStream =
  args.output !== null ? new WriteCustomStream(args.output) : process.stdout;

export const caesarTransformStream = (coding) =>
  new Transform({
    transform(chunk, encoding, callback) {
      const changedData =
        coding === 1
          ? encodeCaesar(chunk.toString().trim())
          : decodeCaesar(chunk.toString().trim());
      callback(null, changedData + '\n');
    },
  });

const rot8TransformStream = (coding) =>
  new Transform({
    transform(chunk, encoding, callback) {
      const changedData =
        coding === 1
          ? encodeROT8(chunk.toString().trim())
          : decodeROT8(chunk.toString().trim());
      callback(null, changedData + '\n');
    },
  });

const atbashTransformStream = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      const changedData = encodeAtbash(chunk.toString().trim());
      callback(null, changedData + '\n');
    },
  });

argsArr.forEach((elem) => {
  switch (elem) {
    case 'C1':
      transformArr.push(caesarTransformStream(1));
      break;
    case 'C0':
      transformArr.push(caesarTransformStream(0));
      break;
    case 'R1':
      transformArr.push(rot8TransformStream(1));
      break;
    case 'R0':
      transformArr.push(rot8TransformStream(0));
      break;
    case 'A':
      transformArr.push(atbashTransformStream());
      break;
    default:
      break;
  }
});

const callback1 = (err) => {
  if (err) {
    console.error(
      'Pipeline failed! Please, check your input(output) file path!',
      err
    );
    process.exit(9);
  } else {
    console.log('Pipeline succeeded!');
  }
};

export const cipher = () => {
  pipeline(readStream, ...transformArr, writeStream, callback1);
};
