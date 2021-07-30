import { Body, Controller, Post } from '@nestjs/common';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}
  @Post('reset')
  reset(@Body() passwordReset: PasswordResetDto) {
    return this.passwordResetService.reset(passwordReset);
  }
}
