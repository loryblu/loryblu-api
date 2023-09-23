import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';
import {
  CreateAccountDto,
  ResetPasswordDto,
  SetPasswordDto,
} from './account.dto';
import { AccountService } from './account.service';

@Controller('/auth')
export class AccountController {
  constructor(
    private mailService: MailService,
    private accountService: AccountService,
  ) {}

  @ApiTags('Authentication')
  @Post('/register')
  async register(@Body() registerInput: CreateAccountDto) {
    await this.accountService.newAccountPropsProcessing(registerInput);

    return { message: 'Conta criada com sucesso!' };
  }

  @ApiTags('Reset Password')
  @Post('/recovery')
  @HttpCode(200)
  async recovery(@Body() recoveryInput: ResetPasswordDto) {
    const created = await this.accountService.createTokenToResetPassword(
      recoveryInput,
    );

    if (created) {
      await this.mailService.sendLinkToResetPassword({
        to: recoveryInput.email,
        recoverLink: created.url,
        userName: created.fullname,
      });
    }

    return {
      recoveryInput,
      message:
        'Se o e-mail existir em nossa base de dados você receberá o link para definir uma nova senha. Verifique sua caixa de entrada e spam.',
    };
  }

  @ApiTags('Reset Password')
  @Post('/set-password')
  @HttpCode(200)
  async setPassword(@Body() setPasswordInput: SetPasswordDto) {
    await this.accountService.saveNewPassword(setPasswordInput);

    return { message: 'Senha redefinida com sucesso!' };
  }
}
