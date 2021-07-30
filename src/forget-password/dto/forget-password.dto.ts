import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}
