import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}
  async sendPasswordResetMail(user: User, token: string) {
    return this.mailerService.sendMail({
      to: user.email,
      from: this.configService.get<string>('SMTP_FROM'),
      subject: 'test',
      template: './password-reset',
      context: {
        username: user.username,
        url:
          this.configService.get<string>('APP_URL') +
          '/password-reset/' +
          token,
      },
    });
  }
}
