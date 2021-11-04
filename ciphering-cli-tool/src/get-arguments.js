import { stdin, stdout } from 'process';

export const getValue = (flag) => {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
};

const config = getValue('-c') ? getValue('-c') : getValue('--config');
const input = getValue('-i') ? getValue('-i') : getValue('--input');
const output = getValue('-o') ? getValue('-o') : getValue('--output');

input
  ? console.log(input)
  : stdin.once('data', (chunk) => {
      let name = chunk.toString();
      console.log('Hello, ' + name + '!');
    });
output ? console.log(output) : stdin.pipe(stdout);
config.match(/^([A]-?|[CR][01]-?)+([A]|[CR][01])$/gm)
  ? console.log(config)
  : console.log('Config is invalid! Please enter some config!');

// stdin.pipe(stdout);
