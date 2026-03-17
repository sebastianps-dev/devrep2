import { Injectable, Inject } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { INotesRepository } from './repositories/notes.repository.interface';

@Injectable()
export class NotesService {
  constructor(
    @Inject(INotesRepository)
    private readonly notesRepository: INotesRepository,
  ) {}

  create(createNoteDto: CreateNoteDto, userId: string) {
    return this.notesRepository.create(createNoteDto, userId);
  }

  findAll(userId: string) {
    return this.notesRepository.findAll(userId);
  }

  findOne(id: string, userId: string) {
    return this.notesRepository.findOne(id, userId);
  }

  update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
    return this.notesRepository.update(id, updateNoteDto, userId);
  }

  remove(id: string, userId: string) {
    return this.notesRepository.remove(id, userId);
  }
}
