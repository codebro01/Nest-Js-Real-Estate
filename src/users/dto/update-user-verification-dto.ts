import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';


export enum IdType {
  NATIONAL_ID = 'nationalIdCard',
  PASSPORT = 'internationalPassport',
  DRIVERS_LICENSE = 'driversLicense',
  VOTERS_CARD = 'votersCard',
}

export enum ProofOfAddressType {
  ELECTRICITY_BILL = 'electricityBill',
  WATER_BILL = 'waterBill',
  BANK_STATEMENT = 'bankStatement',
}

export class UpdateUserVerificationDto {
  @IsEnum(IdType)
  idType: IdType;

  @IsString()
  idFront: string;

  @IsString()
  idBack: string;

  @IsEnum(ProofOfAddressType)
  proofOfAddressType: ProofOfAddressType;

  @IsBoolean()
  isPhoneNumberVerified: boolean;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsBoolean()
  isStageComplete?: boolean;
}
