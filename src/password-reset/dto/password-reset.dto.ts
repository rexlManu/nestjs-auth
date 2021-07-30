import { IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  password: string;
}
