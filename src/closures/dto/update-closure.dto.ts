import { IsString, IsEnum, IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ClosureOperationType } from '../entities/closure.entity';

export class UpdateClosureDto {
  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  contactInfo?: string;

  @IsString()
  @IsOptional()
  propertyTitle?: string;

  @IsDateString()
  @IsOptional()
  closureDate?: string;

  @IsNumber()
  @IsOptional()
  totalValue?: number;

  @IsNumber()
  @IsOptional()
  commission?: number;

  @IsEnum(ClosureOperationType)
  @IsOptional()
  operationType?: ClosureOperationType;

  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsUUID()
  @IsOptional()
  leadId?: string;
}
