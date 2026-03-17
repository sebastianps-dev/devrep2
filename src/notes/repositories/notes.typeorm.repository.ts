import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { INotesRepository } from './notes.repository.interface';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class NotesTypeOrmRepository implements INotesRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const { linkedPropertyId, linkedLeadId, linkedEventId, ...noteData } = createNoteDto;

    const note = this.noteRepository.create({
      ...noteData,
      owner: { id: userId } as any,
      linkedProperty: linkedPropertyId ? ({ id: linkedPropertyId } as any) : null,
      linkedLead: linkedLeadId ? ({ id: linkedLeadId } as any) : null,
      linkedEvent: linkedEventId ? ({ id: linkedEventId } as any) : null,
    });

    return await this.noteRepository.save(note);
  }

  async findAll(userId: string): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { owner: { id: userId } },
      relations: ['linkedProperty', 'linkedLead', 'linkedEvent'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['linkedProperty', 'linkedLead', 'linkedEvent'],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<Note> {
    const note = await this.findOne(id, userId);
    const { linkedPropertyId, linkedLeadId, linkedEventId, ...updateData } = updateNoteDto;

    Object.assign(note, updateData);

    if (linkedPropertyId !== undefined) {
      note.linkedProperty = linkedPropertyId ? ({ id: linkedPropertyId } as any) : null;
    }
    if (linkedLeadId !== undefined) {
      note.linkedLead = linkedLeadId ? ({ id: linkedLeadId } as any) : null;
    }
    if (linkedEventId !== undefined) {
      note.linkedEvent = linkedEventId ? ({ id: linkedEventId } as any) : null;
    }

    return await this.noteRepository.save(note);
  }

  async remove(id: string, userId: string): Promise<void> {
    const note = await this.findOne(id, userId);
    await this.noteRepository.remove(note);
  }
}
