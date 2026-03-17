import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { LeadSource, LeadStatus } from '../enums/lead.enums';

export class CreateLeadDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsEnum(LeadSource)
  source: LeadSource;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsBoolean()
  @IsOptional()
  isHot?: boolean;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  propertyIds?: string[];
}
