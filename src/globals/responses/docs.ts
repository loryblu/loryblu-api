import {} from '@nestjs/common';
import { ApiResponses } from './entity';

export const apiResponses: ApiResponses = {
  ok: {
    status: 200,
    description: 'Ocorreu tudo bem.',
  },
  created: {
    status: 201,
    description: 'O dado enviado criou um novo registro na base de dados.',
  },
  accepted: {
    status: 202,
    description: 'Ocorreu tudo bem, mas pode demorar para terminar.',
  },
  badRequest: {
    status: 400,
    description: 'Algum dado fornecido é, de alguma forma, inválido.',
  },
  unauthorized: {
    status: 401,
    description: 'Requisição não foi autorizado.',
  },
  forbidden: {
    status: 403,
    description: 'Você não tem permissão para executar essa ação.',
  },
  unprocessable: {
    status: 422,
    description:
      'A informação foi entendida, não há erro na sintaxe mas não pode ser processada.',
  },
  internalError: {
    status: 500,
    description: 'Ocorreu um erro desconhecido no servidor.',
  },
};
