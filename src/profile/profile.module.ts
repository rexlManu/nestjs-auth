import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
