import {
  IsString,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  IsOptional,
  IsEnum, 
} from 'class-validator';

export enum PropertyType {
  RESIDENTIAL = 'residential', 
  APARTMENT = 'apartment', 
  LAND = 'land', 
  COMMERCIAL = 'commercial', 
  NEW_DEVELOPMENT = 'newDevelopment', 
  SHORTLET = 'shortLet', 
}

export enum PreferredLanguageType {
  ENGLISH = 'english',
  YORUBA = 'yoruba',
  HAUSA = 'hausa',
  IGBO = 'igbo',
}

export enum ContactFrequencyType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum ProfileVisibilityType {
  PUBLIC = 'public',
  LIMITED = 'limited',
  PRIVATE = 'private',
}

export class UpdateUserPreferencesDto {
 

  @IsEnum(PropertyType, { each: true })
  propertyType: PropertyType[];

  @IsInt()
  @Min(0)
  minBudgetRange: number;

  @IsInt()
  @Min(0)
  maxBudgetRange: number;

  @IsString()
  preferredLocation: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  numberOfBedrooms?: string[];

  @IsOptional()
  @IsBoolean()
  newPropertyAlert?: boolean;

  @IsOptional()
  @IsBoolean()
  priceChangeNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  marketUpdatesAndNews?: boolean;

  @IsOptional()
  @IsBoolean()
  investmentOpportunities?: boolean;

  @IsEnum(PreferredLanguageType)
  preferredLanguage: PreferredLanguageType;

  @IsEnum(ContactFrequencyType)
  contactFrequency: ContactFrequencyType;

  @IsEnum(ProfileVisibilityType)
  profileVisibility: ProfileVisibilityType;

  @IsBoolean()
  isStageComplete?: boolean;
}
