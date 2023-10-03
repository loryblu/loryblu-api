import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Credential } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { hashDataAsync } from '../../globals/utils';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: Credential) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
        },
      ),
    };
  }

  async login(email: string, password: string) {
    const hashedEmail = await hashDataAsync({
      unhashedData: email,
      salt: process.env.SALT_DATA_HASH,
    });

    const user = await this.prisma.credential.findUnique({
      where: {
        email: hashedEmail,
      },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new BadRequestException('A senha está incorreta.');
    }

    return this.createToken(user);
  }
}
