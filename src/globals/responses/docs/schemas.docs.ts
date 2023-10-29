import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const successSchema: SchemaObject = {
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

const errorSchema: SchemaObject = {
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

export const docSchemas = {
  success: successSchema,
  error: errorSchema,
};
