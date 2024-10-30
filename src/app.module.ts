import { Module } from '@nestjs/common';
import configModule from 'src/globals/constants';

import { AccountModule, TaskModule } from './modules';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerOptions,
} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    configModule,
    TaskModule,
    AccountModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 5,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
    ] as ThrottlerOptions[]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
