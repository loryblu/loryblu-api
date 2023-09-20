import { Module } from '@nestjs/common';

import { AccountModule } from './modules';

@Module({
  imports: [AccountModule],
})
export class AppModule {}
