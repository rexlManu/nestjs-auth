import { Body, Controller, Post } from '@nestjs/common';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ForgetPasswordService } from './forget-password.service';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private forgetPasswordService: ForgetPasswordService) {}

  @Post('request')
  async request(@Body() forgetPassword: ForgetPasswordDto) {
    return this.forgetPasswordService.request(forgetPassword);
  }
}
