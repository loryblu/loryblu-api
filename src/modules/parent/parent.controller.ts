import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto, ResetPasswordDto } from './parent.dto';
import { ParentService } from './parent.service';
import { MailService } from '../mail/mail.service';

@Controller('/auth')
export class ParentController {
  constructor(
    private parentService: ParentService,
    private mailService: MailService,
  ) {}

  @ApiTags('Authentication')
  @Post('/register')
  async register(@Body() createAccountInput: CreateAccountDto) {
    await this.parentService.newAccountPropsProcessing(createAccountInput);

    return { message: 'Conta criada com sucesso!' };
  }

  @ApiTags('Reset Password')
  @Post('/recovery')
  @HttpCode(200)
  async recovery(@Body() recoveryInput: ResetPasswordDto) {
    const created = await this.parentService.createTokenToResetPassword(
      recoveryInput,
    );

    if (created) {
      console.log('Send mail to: ', created, recoveryInput.email);
    }

    return {
      message:
        'Se o e-mail existir em nossa base de dados você receberá o link para definir uma nova senha. Verifique sua caixa de entrada e spam.',
    };
  }
}
