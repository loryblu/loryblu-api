import { DocSchemas } from 'src/globals/entity';

function successSchema() {
  return {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      data: {
        type: 'object',
        nullable: true,
      },
    },
  };
}

function errorSchema() {
  return {
    type: 'object',
    properties: {
      details: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            property: {
              type: 'string',
              nullable: true,
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  };
}

export const docSchemas: DocSchemas = {
  $200: successSchema(),
  $201: successSchema(),
  $202: successSchema(),
  $400: errorSchema(),
  $401: errorSchema(),
  $403: errorSchema(),
  $422: errorSchema(),
  $500: errorSchema(),
};
