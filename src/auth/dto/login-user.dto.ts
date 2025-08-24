import {
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class LoginUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // enforce strong-ish password
  password: string;
}
