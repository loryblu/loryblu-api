import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { SendLinkToResetPassword } from './mail.entity';
import { appName } from 'src/globals/constants';
import { PasswordResetTemplate } from './templates';
import {
  EmailLoaderException,
  SendEmailException,
} from 'src/globals/responses/exceptions';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private to: string;
  private subject: string;
  private html: string;
  private currentEnv: string;
  private whiteList: string;

  constructor(
    private configService: ConfigService,
    private readonly mailer: MailerService,
  ) {
    this.currentEnv = this.configService.get<string>('NODE_ENV');
    this.whiteList = this.configService.get<string>('MAIL_WHITELIST');
  }

  async sendLinkToResetPassword(props: SendLinkToResetPassword) {
    const { to, recoverLink, userName } = props;

    try {
      this.to = to;
      this.subject = `${userName} recupere seu acesso a ${appName}`;
      this.html = await PasswordResetTemplate({
        appName,
        recoverLink,
        userName,
      });

      await this.sendMail();
    } catch (error) {
      throw new EmailLoaderException();
    }
  }

  private async sendMail() {
    if (!this.isEmailWhitelisted(this.to) || this.currentEnv === 'production') {
      //colocar no log
      console.log(
        `O e-mail para ${this.to} NÃO está na whitelist ou está em ambiente de produção. NÃO enviando.`,
      );
      return;
    }

    try {
      const response = await this.mailer.sendMail({
        to: this.to,
        subject: this.subject,
        html: this.html,
      });

      return response;
    } catch (error) {
      throw new SendEmailException();
    }
  }

  private isEmailWhitelisted(email: string): boolean {
    const whitelist = this.whiteList;
    return whitelist.includes(email);
  }
}
