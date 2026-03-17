import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { PropertyType, OperationType, PropertyStatus } from '../enums/property.enums';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(OperationType)
  operation: OperationType;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  rentPrice?: number;

  @IsString()
  zone: string;

  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  rentCurrency?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  coordinates?: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsNumber()
  @IsOptional()
  totalArea?: number;

  @IsNumber()
  @IsOptional()
  builtArea?: number;

  @IsNumber()
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  bathrooms?: number;

  @IsNumber()
  @IsOptional()
  parkingSpaces?: number;

  @IsOptional()
  amenities?: string[];

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  contactLastName?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  internalNotes?: string;
}
