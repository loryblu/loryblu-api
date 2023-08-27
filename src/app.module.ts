import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ParentModule } from './modules';

@Module({
  imports: [PrismaModule, ParentModule],
})
export class AppModule {}
