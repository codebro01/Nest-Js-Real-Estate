// src/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MinLength, 
  Matches, 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '@Example123', minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  role: string;

  // Stage 1: Profile info
  @IsOptional()
  @IsString()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  // Stage 2: Contact Info
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  // Stage 3: Employment Info
  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsInt()
  income?: number;

  // Stage 4: Documents
  @IsOptional()
  @IsString()
  idDocumentUrl?: string;

  @IsOptional()
  @IsString()
  utilityBillUrl?: string;

  @IsOptional()
  @IsString()
  otherDocs?: string;
}
