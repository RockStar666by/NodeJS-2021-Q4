import {
  encodeCaesar,
  encodeROT8,
  encodeAtbash,
  decodeCaesar,
  decodeROT8,
} from '../src/ciphering.js';
import { getValue } from '../src/parser.js';
import { configCheck, repeatCheck, argsCheck } from '../src/validation.js';
import {
  cipher,
  streamSwitcher,
  readStream,
  writeStream,
  callback1,
} from '../src/streams.js';
import * as fs from 'fs';

const testLatinSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const testOtherSymbols =
  "0123456789!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0cабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

describe('Error Scenarios: ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('User passes the same cli argument twice', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
    repeatCheck(['-c', 'C1-C1', '--config', '-i', '--input', '-o', '--output']);
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(mockStderr).toHaveBeenCalledWith(
      'ERROR: Вы указали конфигурацию несколько раз!' ||
        'ERROR: Вы указали файл ввода несколько раз!' ||
        'ERROR: Вы указали файл вывода несколько раз!'
    );
  });
  test("User doesn't pass -c or --config argument", () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
    configCheck(['-i', './input.txt', '-o', './output.txt']);
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(mockStderr).toHaveBeenCalledWith(
      'ERROR: Вы не указали конфигурацию! Попробуйте ещё раз запустить файл с флагом -c или --config'
    );
  });

  test('User passes incorrent symbols in argument for --config', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
    argsCheck({
      config: 'C1-C2',
    });
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(mockStderr).toHaveBeenCalledWith(
      'ERROR: Неверный формат конфигурации!'
    );
  });

  test("User passes -i argument with path that doesn't exist or with no read access", () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
    argsCheck({
      config: 'C1-C1',
      input: './dsgsdffg',
    });
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(mockStderr).toHaveBeenCalledWith(
      'ERROR: Неверный путь к файлу ввода (-i)!'
    );
  });

  test("User passes -o argument with path to directory that doesn't exist or with no read access", () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
    argsCheck({
      config: 'C1-C1',
      output: './dsgsdffg',
    });
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(mockStderr).toHaveBeenCalledWith(
      'ERROR: Неверный путь к файлу вывода (-o)!'
    );
  });
});

describe('Success Scenarios:  ', () => {
  test('User passes correct sequence of symbols as argument for --config that matches regular expression', () => {
    const args = {
      config: 'C1-C1',
      input: 'input',
      output: 'output',
    };
    expect(
      configCheck(['-c', 'C1-C1', '-i', './input.txt', '-o', './output.txt'])
    ).toEqual(null);
    expect(argsCheck(args)).toEqual(
      console.log('Current config: ' + args.config)
    );
  });
  test('Cipher usage scenarios from first task description', () => {
    const mockStderr = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => {});
    const argsExample1 = {
      config: 'C1-C1-R0-A',
    };
    const argsExample2 = {
      config: 'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    };
    const argsExample3 = {
      config: 'A-A-A-R1-R0-R0-R0-C1-C1-A',
    };
    const argsExample4 = {
      config: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
    };

    const transformArr1 = streamSwitcher(argsExample1);

    expect(mockStderr).toHaveBeenCalledWith('');
  });
});

describe('Encoding/Decoding Latin symbols: ', () => {
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

describe('Encoding/Decoding other symbols: ', () => {
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
