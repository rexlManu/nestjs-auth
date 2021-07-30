import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsAlphanumeric()
  username: string;
  @IsNotEmpty()
  password: string;
}
