import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responses } from 'src/globals/responses/docs';
import { User } from '../../decorators/account.decorator';
import { CustomHttpError } from '../../globals/responses/exceptions';
import { CustomUploadFilePipe } from '../../globals/uploadFiles.pipe';
import { AuthorizationGuard, RequestToken } from '../../guard';
import { MailService } from '../mail/mail.service';
import {
  AccessTokenDto,
  CreateAccountDto,
  LoginDto,
  ResetPasswordDto,
  SetPasswordDto,
  UploadFileDto,
  UploadFileIdDto,
} from './account.dto';
import { RecoveryControllerOutput } from './account.entity';
import { AccountService } from './account.service';

@Controller('/auth')
export class AccountController {
  private isProdEnv: boolean;

  constructor(
    private mailService: MailService,
    private accountService: AccountService,
    private configService: ConfigService,
  ) {
    const env = this.configService.get<string>('NODE_ENV');
    this.isProdEnv = env === 'production';
  }

  @Post('/register')
  @ApiTags('Authentication')
  @ApiResponse(responses.created)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.unprocessable)
  @ApiResponse(responses.internalError)
  async register(@Body() registerInput: CreateAccountDto) {
    await this.accountService.newAccountPropsProcessing(registerInput);

    return {
      message: 'Conta criada com sucesso',
    };
  }

  @Post('/login')
  @ApiTags('Authentication')
  @HttpCode(200)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.internalError)
  async login(@Body() { email, password }: LoginDto) {
    const { token, refresh, user } = await this.accountService.login(
      email,
      password,
    );

    return {
      message: 'Acesso permitido',
      data: {
        accessToken: token,
        refreshToken: refresh,
        user: user,
      },
    };
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiTags('Authentication')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.internalError)
  async logout(@Body() accessToken: AccessTokenDto) {
    await this.accountService.logout(accessToken);

    return {
      message: 'Logout realizado com sucesso',
    };
  }

  @Post('/upload-file')
  @HttpCode(200)
  @ApiTags('Upload Children Profile Image')
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.internalError)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileChildren(
    @UploadedFile(CustomUploadFilePipe) file: UploadFileDto,
    @Body() { childrenId, parentId }: UploadFileIdDto,
  ) {
    if (!file) throw new CustomHttpError('Nenhum arquivo foi enviado', 400);

    let profile = 'parent';
    if (childrenId) profile = 'children';

    const upload = await this.accountService.uploadFile(
      file,
      profile,
      childrenId,
      parentId,
    );

    if (!upload)
      throw new CustomHttpError('Erro ao carregar foto de perfil', 400);

    return {
      message: `Foto de perfil carregada com sucesso`,
      data: {
        upload,
      },
    };
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
      message: 'Enviamos um e-mail com o link para definir uma nova senha',
    };

    await this.mailService.sendLinkToResetPassword({
      to: recoveryInput.email,
      recoverLink: created.url,
      userName: created.fullname,
    });

    if (!this.isProdEnv) {
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

    return {
      message: 'Senha redefinida com sucesso',
    };
  }
  @UseGuards(AuthorizationGuard)
  @RequestToken({ type: 'access', role: 'user' })
  @ApiBearerAuth('access')
  @Get('/account')
  @ApiTags('Account')
  @HttpCode(200)
  @ApiResponse(responses.ok)
  @ApiResponse(responses.badRequest)
  @ApiResponse(responses.unauthorized)
  @ApiResponse(responses.internalError)
  async getCredential(@User() id: string) {
    const data = await this.accountService.getCredential(id);
    return { message: 'Dados recebidos com sucesso', data };
  }
}
