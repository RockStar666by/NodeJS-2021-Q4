import { argv } from 'process';

export const args = {};

export const getValue = (flag1, flag2, argv) => {
  const flagIndex =
    argv.indexOf(flag1) !== -1 ? argv.indexOf(flag1) : argv.indexOf(flag2);
  return flagIndex !== -1 ? argv[flagIndex + 1] : null;
};

args.config = getValue('-c', '--config', argv);
args.input = getValue('-i', '--input', argv);
args.output = getValue('-o', '--output', argv);
