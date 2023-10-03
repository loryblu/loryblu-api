import { Body, Controller, Post, HttpCode } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './account.auth.service';
import { LoginDto } from './account.auth.login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginDto) {
    await this.authService.login(email, password);
    return { message: 'login efetuado com sucesso' };
  }
}
