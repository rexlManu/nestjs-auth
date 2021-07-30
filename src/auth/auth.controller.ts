import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  register(@Body() registerUser: RegisterUserDto) {
    return this.authService.createUser(registerUser);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  user(@Request() req) {
    return {
      user: req.user,
    };
  }
}
