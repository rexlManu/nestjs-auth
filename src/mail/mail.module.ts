import { MailService } from './mail.service';

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          transport: configService.get<string>('SMTP_TRANSPORT'),
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          defaults: {
            from: configService.get<string>('SMTP_FROM'),
          },
          options: {
            partials: {
              dir: __dirname + '/templates/partials',
              options: {
                strict: true,
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
