import type { Messages } from '../entity';

export const messages: Messages = {
  notEmpty: () => {
    return `Não pode estar vazio.`;
  },
  boolean: () => {
    return `Deve ser booleano.`;
  },
  string: () => {
    return `Deve ser um texto.`;
  },
  arrayOfString: () => {
    return `Deve ser uma lista de textos.`;
  },
  number: () => {
    return `Deve ser um número.`;
  },
  integer: () => {
    return `Deve ser um número inteiro.`;
  },
  enum: ({ constraints }) => {
    const enums = constraints[1];
    return `Deve ser um texto entre essas opções: ${enums}`;
  },
  minSize: ({ constraints }) => {
    const minSize = constraints[0];
    return `Deve ter no mínimo ${minSize} item(ns).`;
  },
  maxSize: ({ constraints }) => {
    const maxSize = constraints[0];
    return `Deve ter no máximo ${maxSize} item(ns).`;
  },
  minLength: ({ constraints }) => {
    const minLength = constraints[0];
    return `Deve ter no mínimo ${minLength} caracteres.`;
  },
  email: () => {
    return `Deve conter um formato de e-mail válido.`;
  },
  strongPassword: () => {
    return `Deve conter uma letra maiúscula, minúscula, número, símbolo e no mínimo 8 caracteres.`;
  },
  fullnamePattern: () => {
    return `Deve conter apenas letras e espaço em branco entre palavras.`;
  },
  birthDatePattern: () => {
    return `Deve ser um texto nesse padrão, YYYY-MM-DD.`;
  },
  recoveryTokenPattern: () => {
    return `Deve ser um texto base64url`;
  },
};
