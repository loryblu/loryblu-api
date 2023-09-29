import { Body, Controller, Post, HttpCode } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AccountService } from '../account/account.service';
import { AuthService } from './account.auth.service';
import { LoginDto } from './account.auth.login.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
