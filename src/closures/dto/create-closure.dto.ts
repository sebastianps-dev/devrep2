import { IsString, IsEnum, IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ClosureOperationType } from '../entities/closure.entity';

export class CreateClosureDto {
  @IsString()
  clientName: string;

  @IsString()
  @IsOptional()
  contactInfo?: string;

  @IsString()
  propertyTitle: string;

  @IsDateString()
  closureDate: string;

  @IsNumber()
  totalValue: number;

  @IsNumber()
  commission: number;

  @IsEnum(ClosureOperationType)
  operationType: ClosureOperationType;

  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsUUID()
  @IsOptional()
  leadId?: string;
}
