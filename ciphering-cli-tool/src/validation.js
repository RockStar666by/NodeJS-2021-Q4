import { stdin, stdout, stderr, exit, argv } from 'process';
import { args } from './parser.js';

const argsCounter = {
  config: 0,
  input: 0,
  output: 0,
};

if (!argv.includes('-c') && !argv.includes('--config')) {
  stderr.write(
    'ERROR: Вы не указали конфигурацию! Попробуйте ещё раз запустить файл с флагом -c или --config'
  );
  exit(9);
}

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

const configNotMatch = () => {
  stderr.write('ERROR: Неверный формат конфигурации!');
  exit(9);
};

export const argsCheck = () => {
  args.config.match(/^([A]-?|[CR][01]-?)+([A]|[CR][01])$/gm)
    ? console.log('Current config: ' + args.config)
    : configNotMatch();

  args.input
    ? console.log('Input: ' + args.input)
    : console.log('Input: process.stdin');

  args.output
    ? console.log('Output: ' + args.output)
    : console.log('Output: process.stdout');
};
