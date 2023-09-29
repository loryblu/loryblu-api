import { Module } from '@nestjs/common';

import { AccountModule } from './modules';
import { AuthModule } from './modules/jwtModule/account.auth.module';

@Module({
  imports: [AccountModule, AuthModule],
})
export class AppModule {}
