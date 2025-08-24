import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsInt()
  @Min(1) // must be at least 1
  age: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // enforce strong-ish password
  password: string;
}
