import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from 'src/user/decorator/user.decorator';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Post('change-password')
  changePassword(@User() user, @Body() changePassword: ChangePasswordDto) {
    return this.profileService.changePassword(user, changePassword);
  }
}
