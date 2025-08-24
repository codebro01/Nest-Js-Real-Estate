import {
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // enforce strong-ish password
  password: string;
}
