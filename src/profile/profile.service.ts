import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.interface';

@Injectable()
export class ProfileService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async changePassword(user: User, changePassword: ChangePasswordDto) {
    const userEntity = await this.userService.findOneById(user.id);
    if (
      !userEntity ||
      !(await this.authService.comparePasswords(
        changePassword.currentPassword,
        userEntity.password,
      )) ||
      changePassword.currentPassword === changePassword.newPassword
    ) {
      throw new BadRequestException('Password change is invalid.');
    }

    userEntity.password = await this.authService.hashPassword(
      changePassword.newPassword,
    );

    await this.userService.update(userEntity);
    return {
      message: 'The password was updated.',
    };
  }
}
