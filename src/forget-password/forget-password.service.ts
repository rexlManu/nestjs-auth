import { Injectable, NotFoundException } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { UserService } from '../user/user.service';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private userService: UserService,
    private passwordResetService: PasswordResetService,
    private mailService: MailService,
  ) {}
  async request(forgetPassword: ForgetPasswordDto) {
    const user = await this.userService.findOneByEmail(forgetPassword.email);
    if (!user) {
      throw new NotFoundException('Remove me in production please.');
    }
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const passwordReset = await this.passwordResetService.create(
      user,
      expiresAt,
    );
    this.mailService.sendPasswordResetMail(user, passwordReset.token);
    return {
      message: 'A password reset request was sent to your mail.',
    };
  }
}
