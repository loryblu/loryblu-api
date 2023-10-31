import { Module } from '@nestjs/common';

import { AccountModule, TaskModule } from './modules';

@Module({
  imports: [TaskModule, AccountModule],
})
export class AppModule {}
