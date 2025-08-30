import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsInt,
  Min,
  IsDate
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6) // enforce strong-ish password
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;


}
