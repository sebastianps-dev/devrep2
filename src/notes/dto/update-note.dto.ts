import { IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { NotePriority } from '../enums/note-priority.enum';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(NotePriority)
  @IsOptional()
  priority?: NotePriority;

  @IsString()
  @IsOptional()
  color?: string;

  @IsUUID()
  @IsOptional()
  linkedPropertyId?: string;

  @IsUUID()
  @IsOptional()
  linkedLeadId?: string;

  @IsUUID()
  @IsOptional()
  linkedEventId?: string;
}
