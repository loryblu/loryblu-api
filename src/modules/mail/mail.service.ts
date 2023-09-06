import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { renderAsync } from '@react-email/render';
import { Resend } from 'resend';

import { appName } from 'src/globals/constants';
import ConfirmPasswordReset from './templates/emails/ConfirmPasswordReset';
import type { ConfirmPasswordResetProps } from './mail.types';

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

  async confirmPasswordReset({ to, username, url }: ConfirmPasswordResetProps) {
    this.to = to;
    this.subject = `${username} recupere seu acesso a ${appName}`;

    await this.htmlLoader(
      ConfirmPasswordReset({
        username,
        url,
        appName,
      }),
    );

    await this.sendMail();
  }

  private async htmlLoader(template: React.ReactElement) {
    try {
      this.html = await renderAsync(template, { pretty: true });
    } catch (error) {
      throw new InternalServerErrorException('Error when trying to load html');
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
      throw new InternalServerErrorException('Error when trying to send email');
    }
  }
}
