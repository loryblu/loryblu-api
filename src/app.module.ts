import { Module } from '@nestjs/common';
import configModule from 'src/globals/constants';

import { AccountModule, TaskModule } from './modules';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    configModule,
    TaskModule,
    AccountModule,
    MailerModule.forRoot({
      transport: {
        port: Number(process.env.MAIL_PORT),
        host: process.env.MAIL_HOST,
        secure: process.env.MAIL_PORT === '465' ? true : false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
      },
    }),
  ],
})
export class AppModule {}
