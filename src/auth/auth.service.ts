import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    return this.createToken(user);
  }
  createToken(user: User) {
    return {
      accessToken: this.signToken({
        username: user.username,
        id: user.id,
      }),
    };
  }
  async createUser(registerUser: RegisterUserDto) {
    registerUser.password = await this.hashPassword(registerUser.password);
    const user = await this.userService.create(registerUser);
    return this.createToken(user);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  signToken(user: User) {
    return this.jwtService.sign(user);
  }
}
