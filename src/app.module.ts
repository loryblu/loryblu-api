import { Module } from '@nestjs/common';
import configModule from 'src/globals/constants';

import { AccountModule } from './modules';

@Module({
  imports: [configModule, AccountModule],
})
export class AppModule {}
