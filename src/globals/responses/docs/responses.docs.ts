import { ApiResponses } from 'src/globals/entity';

export const responses: ApiResponses = {
  ok: {
    status: 200,
    description: 'Ocorreu tudo bem.',
    schema: {
      $ref: '#/components/schemas/success',
    },
  },
  created: {
    status: 201,
    description: 'O dado enviado criou um novo registro na base de dados.',
    schema: {
      $ref: '#/components/schemas/success',
    },
  },
  accepted: {
    status: 202,
    description: 'Ocorreu tudo bem, mas pode demorar para terminar.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
  badRequest: {
    status: 400,
    description: 'Algum dado fornecido é, de alguma forma, inválido.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
  unauthorized: {
    status: 401,
    description: 'Requisição não foi autorizado.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
  forbidden: {
    status: 403,
    description: 'Você não tem permissão para executar essa ação.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
  unprocessable: {
    status: 422,
    description:
      'A informação foi entendida, não há erro na sintaxe mas não pode ser processada.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
  internalError: {
    status: 500,
    description: 'Ocorreu um erro desconhecido no servidor.',
    schema: {
      $ref: '#/components/schemas/error',
    },
  },
};
