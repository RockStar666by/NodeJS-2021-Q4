import { stderr, exit, argv } from 'process';
import * as fs from 'fs';

const argsCounter = {
  config: 0,
  input: 0,
  output: 0,
};

export const configCheck = (argv) => {
  if (!argv.includes('-c') && !argv.includes('--config')) {
    stderr.write(
      'ERROR: Вы не указали конфигурацию! Попробуйте ещё раз запустить файл с флагом -c или --config'
    );
    exit(9);
  }
  return null;
};

export const repeatCheck = (argv) => {
  argv.forEach((elem) => {
    switch (elem) {
      case '-c':
      case '--config':
        argsCounter.config += 1;
        if (argsCounter.config > 1) {
          stderr.write('ERROR: Вы указали конфигурацию несколько раз!');
          exit(9);
        }
        break;
      case '-i':
      case '--input':
        argsCounter.input += 1;
        if (argsCounter.input > 1) {
          stderr.write('ERROR: Вы указали файл ввода несколько раз!');
          exit(9);
        }
        break;
      case '-o':
      case '--output':
        argsCounter.output += 1;
        if (argsCounter.output > 1) {
          stderr.write('ERROR: Вы указали файл вывода несколько раз!');
          exit(9);
        }
        break;
      default:
        break;
    }
  });
};

const configNotMatch = () => {
  stderr.write('ERROR: Неверный формат конфигурации!');
  exit(9);
};

const inputNotMatch = () => {
  stderr.write('ERROR: Неверный путь к файлу ввода (-i)!');
  exit(9);
};

const outputNotMatch = () => {
  stderr.write('ERROR: Неверный путь к файлу вывода (-o)!');
  exit(9);
};

export const argsCheck = (args) => {
  if (args.input === undefined) inputNotMatch();
  if (args.output === undefined) outputNotMatch();

  args.config.match(/^([A]-?|[CR][01]-?)+([A]|[CR][01])$/gm)
    ? console.log('Current config: ' + args.config)
    : configNotMatch();

  args.input
    ? fs.existsSync(args.input)
      ? console.log('Input: ' + args.input)
      : inputNotMatch()
    : console.log('Input: process.stdin');

  args.output
    ? fs.existsSync(args.output)
      ? console.log('Output: ' + args.output)
      : outputNotMatch()
    : console.log('Output: process.stdout');
};
