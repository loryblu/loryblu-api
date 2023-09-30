import type { Messages } from '../entity';

export const messages: Messages = {
  notEmpty: ({ property }) => {
    return `${property}: Não pode estar vazio.`;
  },
  boolean: ({ property }) => {
    return `${property}: Deve ser 'boolean'.`;
  },
  string: ({ property }) => {
    return `${property}: Deve ser uma 'string'.`;
  },
  minLength: ({ property, constraints }) => {
    const minLength = constraints[0];
    return `${property}: Deve ter no mínimo ${minLength}.`;
  },
  email: ({ property }) => {
    return `${property}: Deve conter um formato de e-mail válido.`;
  },
  strongPassword: ({ property }) => {
    return `${property}: Deve conter uma letra maiúscula, minúscula, número, símbolo e no mínimo 8 caracteres.`;
  },
  fullnamePattern: ({ property }) => {
    return `${property}: Deve conter apenas letras e espaço em branco entre palavras.`;
  },
  birthDatePattern: ({ property }) => {
    return `${property}: Deve ser um texto nesse padrão, YYYY-MM-DD.`;
  },
  genderPattern: ({ property, constraints }) => {
    const genders = constraints[1];
    return `${property}: Deve ser um texto. [${genders}]`;
  },
  recoveryTokenPattern: ({ property }) => {
    return `${property}: Deve ser um texto base64url`;
  },
};
