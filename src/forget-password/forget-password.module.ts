import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordController } from './forget-password.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from '../password-reset/entity/password-reset.entity';
import { PasswordResetModule } from '../password-reset/password-reset.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([PasswordReset]),
    PasswordResetModule,
    MailModule,
  ],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
