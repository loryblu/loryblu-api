import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = [];

export const corsOptionsConfig: CorsOptions = {
  origin: whitelist,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type, Authorization'],
};
