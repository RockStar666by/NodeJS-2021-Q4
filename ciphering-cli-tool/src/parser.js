import { argv } from 'process';

export const args = {};

const getValue = (flag1, flag2) => {
  const flagIndex =
    argv.indexOf(flag1) !== -1 ? argv.indexOf(flag1) : argv.indexOf(flag2);
  return flagIndex !== -1 ? argv[flagIndex + 1] : null;
};

args.config = getValue('-c', '--config');
args.input = getValue('-i', '--input');
args.output = getValue('-o', '--output');
