import {} from '@nestjs/common';
import { ApiResponses } from './entity';

export const apiResponses: ApiResponses = {
  ok: {
    status: 200,
    description: 'Ocorreu tudo bem.',
    schema: {
      example: {
        message: 'description',
      },
    },
  },
  created: {
    status: 201,
    description: 'O dado enviado criou um novo registro na base de dados.',
    schema: {
      example: {
        message: 'description',
      },
    },
  },
  accepted: {
    status: 202,
    description: 'Ocorreu tudo bem, mas pode demorar para terminar.',
    schema: {
      example: {
        message: 'description',
      },
    },
  },
  badRequest: {
    status: 400,
    description: 'Algum dado fornecido é, de alguma forma, inválido.',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: 'description',
      },
    },
  },
  unauthorized: {
    status: 401,
    description: 'Requisição não foi autorizado.',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'description',
      },
    },
  },
  forbidden: {
    status: 403,
    description: 'Você não tem permissão para executar essa ação.',
    schema: {
      example: {
        statusCode: 403,
        error: 'Forbidden',
        message: 'description',
      },
    },
  },
  unprocessable: {
    status: 422,
    description:
      'A informação foi entendida, não há erro na sintaxe mas não pode ser processada.',
    schema: {
      example: {
        statusCode: 422,
        error: 'Unprocessable',
        message: 'description',
      },
    },
  },
  internalError: {
    status: 500,
    description: 'Ocorreu um erro desconhecido no servidor.',
    schema: {
      example: {
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'description',
      },
    },
  },
};
