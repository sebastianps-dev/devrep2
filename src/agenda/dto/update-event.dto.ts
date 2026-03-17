import { IsString, IsEnum, IsDateString, IsOptional, IsArray, IsUUID } from 'class-validator';
import { EventType } from '../enums/event-type.enum';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Contact fields
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsOptional()
  leadId?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  propertyIds?: string[];
}
