import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

export interface IAgendaRepository {
  create(createEventDto: CreateEventDto, userId: string): Promise<Event>;
  findAll(userId: string): Promise<Event[]>;
  findOne(id: string, userId: string): Promise<Event>;
  update(id: string, updateEventDto: UpdateEventDto, userId: string): Promise<Event>;
  remove(id: string, userId: string): Promise<void>;
}

export const IAgendaRepository = Symbol('IAgendaRepository');
