import { IsString, IsEnum, IsDateString, IsOptional, IsArray, IsUUID } from 'class-validator';
import { EventType } from '../enums/event-type.enum';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsEnum(EventType)
  type: EventType;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

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
