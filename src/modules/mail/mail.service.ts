import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

import type { SendLinkToResetPassword } from './mail.entity';
import { appName } from 'src/globals/constants';
import { PasswordResetTemplate } from './templates';
import {
  EmailLoaderException,
  SendEmailException,
} from 'src/globals/responses/general.exceptions';

@Injectable()
export class MailService {
  private resend: Resend;
  private from: string;
  private to: string;
  private subject: string;
  private html: string;

  constructor() {
    this.resend = new Resend(process.env.MAIL_API_KEY);
    this.from = `${appName} <${process.env.MAIL_FROM}>`;
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
    try {
      const response = await this.resend.emails.send({
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
}
