import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { PropertyType, OperationType, PropertyStatus } from '../enums/property.enums';

export class UpdatePropertyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(PropertyType)
  @IsOptional()
  type?: PropertyType;

  @IsEnum(OperationType)
  @IsOptional()
  operation?: OperationType;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  rentPrice?: number;

  @IsString()
  @IsOptional()
  zone?: string;

  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
