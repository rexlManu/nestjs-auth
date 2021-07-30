import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordReset } from './entity/password-reset.entity';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.interface';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private repository: Repository<PasswordReset>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async create(user: User, expiresAt: Date) {
    return this.repository.save(
      new PasswordReset({
        user: user,
        expiresAt,
      }),
    );
  }
  async reset(passwordResetDto: PasswordResetDto) {
    const passwordReset = await this.repository.findOne({
      token: passwordResetDto.token,
      expiresAt: MoreThan(new Date()),
    });
    if (!passwordReset) {
      throw new NotFoundException('Could not found password reset.');
    }

    const user = passwordReset.user;
    user.password = await this.authService.hashPassword(
      passwordResetDto.password,
    );
    this.userService.update(user);
    this.repository.delete(passwordReset.id);
    return {
      message: 'The password was updated.',
    };
  }
}
