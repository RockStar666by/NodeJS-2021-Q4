import { atbashABC, caesarABC, rot8ABC } from './alphabets.js';

export const encodeCaesar = (text) => {
  return encode(text, caesarABC);
};

export const decodeCaesar = (text) => {
  return decode(text, caesarABC);
};

export const encodeAtbash = (text) => {
  return encode(text, atbashABC);
};

export const encodeROT8 = (text) => {
  return encode(text, rot8ABC);
};

export const decodeROT8 = (text) => {
  return decode(text, rot8ABC);
};

const encode = (text, alphabet) => {
  const arr = [];
  text.split('').forEach((el) => {
    alphabet[el] ? arr.push(alphabet[el]) : arr.push(el);
  });
  return arr.join('');
};

const decode = (text, alphabet) => {
  const arr = [];
  text
    .split('')
    .forEach((el) =>
      alphabet[el]
        ? arr.push(Object.keys(alphabet).find((key) => alphabet[key] === el))
        : arr.push(el)
    );
  return arr.join('');
};
