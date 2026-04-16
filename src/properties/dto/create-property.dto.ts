import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType, OperationType, PropertyStatus } from '../enums/property.enums';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(OperationType)
  operation: OperationType;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  rentPrice?: number;

  @IsString()
  zone: string;

  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @IsUrl()
  @IsOptional()
  @IsString()
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
  @Type(() => Number)
  totalArea?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  builtArea?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  bathrooms?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parkingSpaces?: number;

  @IsOptional()
  amenities?: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  halfBathrooms?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  constructionYear?: number;

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
