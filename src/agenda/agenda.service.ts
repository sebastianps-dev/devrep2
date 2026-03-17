import { Injectable, Inject } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IAgendaRepository } from './repositories/agenda.repository.interface';

@Injectable()
export class AgendaService {
  constructor(
    @Inject(IAgendaRepository)
    private readonly agendaRepository: IAgendaRepository,
  ) {}

  create(createEventDto: CreateEventDto, userId: string) {
    return this.agendaRepository.create(createEventDto, userId);
  }

  findAll(userId: string) {
    return this.agendaRepository.findAll(userId);
  }

  findOne(id: string, userId: string) {
    return this.agendaRepository.findOne(id, userId);
  }

  update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    return this.agendaRepository.update(id, updateEventDto, userId);
  }

  remove(id: string, userId: string) {
    return this.agendaRepository.remove(id, userId);
  }
}
