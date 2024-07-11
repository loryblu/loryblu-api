import type { Messages } from '../entity';

export const messages: Messages = {
  notEmpty: 'Não pode estar vazio.',
  boolean: 'Deve ser booleano.',
  string: 'Deve ser um texto.',
  arrayOfString: 'Deve ser uma lista de textos.',
  number: 'Deve ser um número.',
  integer: 'Deve ser um número inteiro.',
  UUID: 'Deve ser um UUID. ex: "44f29121-b7b1-4d1a-bbff-5f1cf2fc5497"',
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
  minNumber: ({ constraints }) => {
    const minNumber = constraints[0];
    return `Valor mínimo é ${minNumber}.`;
  },
  maxNumber: ({ constraints }) => {
    const maxNumber = constraints[0];
    return `Valor máximo é ${maxNumber}.`;
  },
  email: 'Deve conter um formato de e-mail válido.',
  strongPassword:
    'Deve conter uma letra maiúscula, minúscula, número, símbolo e no mínimo 8 caracteres.',
  fullnamePattern: 'Use apenas letras e espaço em branco entre palavras.',
  multipleNameRequired: 'Digite o nome completo',
  birthDatePattern: 'Use o padrão ano, mês e dia (YYYY-MM-DD).',
  birthDateRange: 'Data inválida.',
  recoveryTokenPattern: 'Deve ser um texto base64url',
};
