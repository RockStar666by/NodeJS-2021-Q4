import {
  encodeCaesar,
  encodeROT8,
  encodeAtbash,
  decodeCaesar,
  decodeROT8,
} from '../src/ciphering.js';
import { getValue } from '../src/parser.js';

const args = {
  config: 'config',
  input: 'input',
  output: 'output',
};

const testLatinSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const testOtherSymbols =
  "0123456789!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0cабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

describe('Encoding/Decoding Latin symbols', () => {
  test('Caesar encoding', () => {
    const encode = encodeCaesar(testLatinSymbols);
    expect(encode).toEqual(
      'bcdefghijklmnopqrstuvwxyzaBCDEFGHIJKLMNOPQRSTUVWXYZA'
    );
  });

  test('Caesar decoding', () => {
    const encode = decodeCaesar(testLatinSymbols);
    expect(encode).toEqual(
      'zabcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXY'
    );
  });

  test('ROT-8 encoding', () => {
    const encode = encodeROT8(testLatinSymbols);
    expect(encode).toEqual(
      'ijklmnopqrstuvwxyzabcdefghIJKLMNOPQRSTUVWXYZABCDEFGH'
    );
  });

  test('ROT-8 decoding', () => {
    const encode = decodeROT8(testLatinSymbols);
    expect(encode).toEqual(
      'stuvwxyzabcdefghijklmnopqrSTUVWXYZABCDEFGHIJKLMNOPQR'
    );
  });

  test('Atbash decoding', () => {
    const encode = encodeAtbash(testLatinSymbols);
    expect(encode).toEqual(
      'zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA'
    );
  });
});

describe('Encoding/Decoding other symbols', () => {
  test('Caesar encoding', () => {
    const encode = encodeCaesar(testOtherSymbols);
    expect(encode).toEqual(testOtherSymbols);
  });

  test('Caesar decoding', () => {
    const encode = decodeCaesar(testOtherSymbols);
    expect(encode).toEqual(testOtherSymbols);
  });

  test('ROT-8 encoding', () => {
    const encode = encodeROT8(testOtherSymbols);
    expect(encode).toEqual(testOtherSymbols);
  });

  test('ROT-8 decoding', () => {
    const encode = decodeROT8(testOtherSymbols);
    expect(encode).toEqual(testOtherSymbols);
  });

  test('Atbash decoding', () => {
    const encode = encodeAtbash(testOtherSymbols);
    expect(encode).toEqual(testOtherSymbols);
  });
});

describe('Parser:', () => {
  const argvArr = [
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\savch_000\\Desktop\\JS\\NodeJS-2021-Q4\\NodeJS-2021-Q4\\ciphering-cli-tool\\my_cipher',
    '-c',
    'C1-C1',
    '-i',
    './input.txt',
    '-o',
    './output.txt',
  ];
  test('Getting flag values', () => {
    expect(getValue('-c', '--config', argvArr)).toEqual(argvArr[3]);
    expect(getValue('-i', '--input', argvArr)).toEqual(argvArr[5]);
    expect(getValue('-o', '--output', argvArr)).toEqual(argvArr[7]);
  });
});
