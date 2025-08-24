import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsInt()
  @Min(1) // must be at least 1
  age: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
