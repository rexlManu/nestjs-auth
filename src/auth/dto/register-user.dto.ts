import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  username: string;
  @IsNotEmpty()
  password: string;
}
