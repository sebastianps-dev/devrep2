import { IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { NotePriority } from '../enums/note-priority.enum';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

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
