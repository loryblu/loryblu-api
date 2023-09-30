import { Controller, Post, Body, HttpCode, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';
import {
  CreateAccountDto,
  ResetPasswordDto,
  SetPasswordDto,
} from './account.dto';
import { AccountService } from './account.service';
import { responses } from 'src/globals/responses/docs';
import { isProductionEnv } from 'src/globals/constants';

@Controller('/auth')
export class AccountController {
  constructor(
    private mailService: MailService,
    private accountService: AccountService,
  ) {}

  @Post('/register')
  @ApiTags('Authentication')
  @ApiResponse(responses.created)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async register(@Body() registerInput: CreateAccountDto) {
    await this.accountService.newAccountPropsProcessing(registerInput);

    return { message: 'Conta criada com sucesso!' };
  }

  @Post('/recovery')
  @HttpCode(200)
  @ApiTags('Reset Password')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.internalError)
  async recovery(@Body() recoveryInput: ResetPasswordDto) {
    const message =
      'Se o e-mail existir em nossa base de dados você receberá o link para definir uma nova senha. Verifique sua caixa de entrada e spam.';
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

    if (created && !isProductionEnv) {
      return {
        recoverLink: created.url,
        message,
      };
    }

    return {
      message,
    };
  }

  @Put('/set-password')
  @HttpCode(200)
  @ApiTags('Reset Password')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.internalError)
  async setPassword(@Body() setPasswordInput: SetPasswordDto) {
    await this.accountService.saveNewPassword(setPasswordInput);

    return { message: 'Senha redefinida com sucesso!' };
  }
}
