import type { ErrorMessagesProps } from './types';

export const errorMessages: ErrorMessagesProps = {
  emptyField: (args) => {
    return `O campo [${args.property}] não pode estar vazio.`;
  },
  booleanField: (args) => {
    return `O campo [${args.property}] deve ser booleano.`;
  },
  stringField: (args) => {
    return `O campo [${args.property}] deve ser do tipo texto.`;
  },
  minLength: (args) => {
    return `O campo [${args.property}] deve conter no mínimo ${args.constraints[0]} caracteres.`;
  },
  maxLength: (args) => {
    return `O campo [${args.property}] deve conter no máximo ${args.constraints[1]} caracteres.`;
  },
  fullnameField: (args) => {
    return `O campo [${args.property}] deve conter apenas letras e espaço em branco.`;
  },
  emailPattern: () => {
    return 'O e-mail informado deve ter um formato válido. ex: suenome@exemplo.com';
  },
  passwordPattern: () => {
    return 'A senha deve conter no mínimo uma letra maiúscula, uma letra minúscula, um número, um símbolo e no mínimo 8 caracteres.';
  },
  birthDatePattern: () => {
    return 'A data de nescimento informada deve ter um formato ISO8601 e ser do tipo texto.';
  },
  genderPattern: (args) => {
    return `O sexo deve ser [${args.constraints[1]}].`;
  },
};
