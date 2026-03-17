import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

export interface INotesRepository {
  create(createNoteDto: CreateNoteDto, userId: string): Promise<Note>;
  findAll(userId: string): Promise<Note[]>;
  findOne(id: string, userId: string): Promise<Note>;
  update(id: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<Note>;
  remove(id: string, userId: string): Promise<void>;
}

export const INotesRepository = Symbol('INotesRepository');
