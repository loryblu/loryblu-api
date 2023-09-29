import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Credential } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token);

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.credential.findFirst({
      where: {
        email,
        password,
      },
    });

    console.log(user);
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
    if (!comparePassword) {
      throw new UnauthorizedException('A senha está incorreta.');
    }

    return this.createToken(user);
  }
}
