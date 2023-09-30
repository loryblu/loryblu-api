import { DocSchemas } from 'src/globals/entity';

function successSchema() {
  return {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
    },
  };
}

function errorSchema(statusCode: number, error: string) {
  return {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        example: statusCode,
      },
      error: {
        type: 'string',
        example: error,
      },
      message: {
        type: 'string',
      },
    },
  };
}

export const docSchemas: DocSchemas = {
  $200: successSchema(),
  $201: successSchema(),
  $202: successSchema(),
  $400: errorSchema(400, 'Bad Request'),
  $401: errorSchema(401, 'Unauthorized'),
  $403: errorSchema(403, 'Forbidden'),
  $422: errorSchema(422, 'Unprocessable'),
  $500: errorSchema(500, 'Internal Server Error'),
};
