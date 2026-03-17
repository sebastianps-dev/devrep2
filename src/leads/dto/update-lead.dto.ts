import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { LeadSource, LeadStatus } from '../enums/lead.enums';

export class UpdateLeadDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(LeadSource)
  @IsOptional()
  source?: LeadSource;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsBoolean()
  @IsOptional()
  isHot?: boolean;

  @IsBoolean()
  @IsOptional()
  isLate?: boolean;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  noAptoReason?: string;

  @IsString()
  @IsOptional()
  noAptoDescription?: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  propertyIds?: string[];
}
