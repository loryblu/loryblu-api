import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ParentAccountModule } from './modules';

@Module({
  imports: [PrismaModule, ParentAccountModule],
})
export class AppModule {}
