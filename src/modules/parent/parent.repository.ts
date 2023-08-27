import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParentRepository {
  constructor(private prisma: PrismaService) {}

  async findParent() {
    return await this.prisma.parentProfile.findMany();
  }
}
