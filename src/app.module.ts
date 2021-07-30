import { ProfileModule } from './profile/profile.module';
import { MailModule } from './mail/mail.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { PasswordReset } from './password-reset/entity/password-reset.entity';

@Module({
  imports: [
    ProfileModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mariadb',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PasswordResetModule,
    ForgetPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
