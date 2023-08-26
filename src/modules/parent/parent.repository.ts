import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParentAccountRepository {
  constructor(private prisma: PrismaService) {}

  async findParentAccount() {
    return await this.prisma.parentAccount.findMany();
  }
}
