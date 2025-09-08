import {
  IsString,
  // IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  displayName?: string;

  @IsBoolean()
  emailVerified?: boolean;

  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsDateString()
  dateOfBirth?: string;

  @IsString()
  gender?: string;

  @IsString()
  dp?: string;

  @IsString()
  phone?: string;

  @IsString()
  authProvider?: string;

  @IsBoolean()
  isStageComplete?: boolean;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
