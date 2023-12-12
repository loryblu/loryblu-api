import { Module } from '@nestjs/common';
import configModule from 'src/globals/constants';

import { AccountModule, TaskModule } from './modules';

@Module({
  imports: [configModule, TaskModule, AccountModule],
})
export class AppModule {}
