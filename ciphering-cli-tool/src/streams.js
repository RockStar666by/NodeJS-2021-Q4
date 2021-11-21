import { pipeline, Transform } from 'stream';
import { ReadCustomStream, WriteCustomStream } from './custom-streams.js';
import {
  encodeCaesar,
  encodeAtbash,
  encodeROT8,
  decodeCaesar,
  decodeROT8,
} from './ciphering.js';

export const readStream = (args) => {
  return args.input !== null ? new ReadCustomStream(args.input) : process.stdin;
};

export const writeStream = (args) => {
  return args.output !== null
    ? new WriteCustomStream(args.output)
    : process.stdout;
};

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

export const streamSwitcher = (args) => {
  const transformArr = [];
  const argsArr = args.config.split('-');
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
  return transformArr;
};

export const callback1 = (err) => {
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

export const cipher = (readStream, transformArr, writeStream, callback1) => {
  pipeline(readStream, ...transformArr, writeStream, callback1);
};
