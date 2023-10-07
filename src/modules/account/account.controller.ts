import { Controller, Post, Body, HttpCode, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';
import {
  CreateAccountDto,
  LoginDto,
  ResetPasswordDto,
  SetPasswordDto,
} from './account.dto';
import { AccountService } from './account.service';
import { responses } from 'src/globals/responses/docs';
import { isProductionEnv } from 'src/globals/constants';
import { RecoveryControllerOutput } from './account.entity';

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

  @Post('/login')
  @ApiTags('Authentication')
  @HttpCode(200)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.internalError)
  async login(@Body() { email, password }: LoginDto) {
    const token = await this.accountService.login(email, password);
    return { token, message: 'Login efetuado com sucesso' };
  }

  @Post('/recovery')
  @HttpCode(200)
  @ApiTags('Reset Password')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.internalError)
  async recovery(@Body() recoveryInput: ResetPasswordDto) {
    const created = await this.accountService.createTokenToResetPassword(
      recoveryInput,
    );

    const response: RecoveryControllerOutput = {
      message: 'Te enviamos um e-mail com o link para definir uma nova senha.',
    };

    await this.mailService.sendLinkToResetPassword({
      to: recoveryInput.email,
      recoverLink: created.url,
      userName: created.fullname,
    });

    if (!isProductionEnv) {
      response.recoverLink = created.url;
    }

    return response;
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
