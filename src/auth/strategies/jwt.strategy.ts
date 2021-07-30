import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.interface';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreEpiration: true,
    });
  }

  async validate(payload: any) {
    const userEntity = await this.userService.findOne(payload.username);

    if (!userEntity) {
      throw new UnauthorizedException();
    }
    delete userEntity.password;
    return userEntity;
  }
}
