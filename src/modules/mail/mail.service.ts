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
  private from: string;
  private to: string;
  private subject: string;
  private html: string;

  constructor(
    private configService: ConfigService,
    private readonly mailer: MailerService,
  ) {
    this.from = `${appName} <${this.configService.get<string>('MAIL_FROM')}>`;
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

      if (this.isEmailWhitelisted(this.to)) {
        await this.sendMail();
        console.log(`O e-mail para ${this.to} ESTÁ na whitelist. Enviando.`);
      } else {
        console.log(
          `O e-mail para ${this.to} NÃO está na whitelist. NÃO enviando.`,
        );
      }
    } catch (error) {
      throw new EmailLoaderException();
    }
  }

  private async sendMail() {
    try {
      const response = await this.mailer.sendMail({
        from: this.from,
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
    const whitelist = process.env.WHITE_LIST;
    return whitelist.includes(email);
  }
}
