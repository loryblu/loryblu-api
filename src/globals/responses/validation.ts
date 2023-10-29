import type { Messages } from '../entity';

export const messages: Messages = {
  notEmpty: () => {
    return `Não pode estar vazio.`;
  },
  boolean: () => {
    return `Deve ser 'boolean'.`;
  },
  string: () => {
    return `Deve ser uma 'string'.`;
  },
  minLength: ({ constraints }) => {
    const minLength = constraints[0];
    return `Deve ter no mínimo ${minLength}.`;
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
  genderPattern: ({ constraints }) => {
    const genders = constraints[1];
    return `Deve ser um texto. [${genders}]`;
  },
  recoveryTokenPattern: () => {
    return `Deve ser um texto base64url`;
  },
};
