import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Credential } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { hashDataAsync } from '../../globals/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: Credential) {
    const token = {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '1 h',
          subject: String(user.id),
        },
      ),

      refreshToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '3 h',
          subject: String(user.id),
        },
      ),
    };

    return token;
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
