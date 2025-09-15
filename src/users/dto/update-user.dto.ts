import { IsString, IsBoolean, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'User’s display name or username',
  })
  @IsString()
  displayName?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates whether the user’s email has been verified',
  })
  @IsBoolean()
  emailVerified?: boolean;

  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  firstname?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({
    example: '1995-08-15',
    description: 'Date of birth of the user (ISO 8601 format)',
  })
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    example: 'male',
    description: 'Gender of the user',
  })
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    example:
      'https://res.cloudinary.com/demo/image/upload/v1691234567/avatar.jpg',
    description: 'Profile picture (URL)',
  })
  @IsString()
  dp?: string;

  @ApiPropertyOptional({
    example: '+2348012345678',
    description: 'User’s phone number (include country code)',
  })
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'google',
    description: 'Authentication provider (e.g., google, facebook, email)',
  })
  @IsString()
  authProvider?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the user has completed this profile update stage',
  })
  @IsBoolean()
  isStageComplete?: boolean;
}
