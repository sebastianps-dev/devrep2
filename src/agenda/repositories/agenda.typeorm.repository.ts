import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Event } from '../entities/event.entity';
import { IAgendaRepository } from './agenda.repository.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Property } from '../../properties/entities/property.entity';

@Injectable()
export class AgendaTypeOrmRepository implements IAgendaRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createEventDto: CreateEventDto, userId: string): Promise<Event> {
    const { propertyIds, leadId, ...eventData } = createEventDto;

    const event = this.eventRepository.create({
      ...eventData,
      owner: { id: userId } as any,
      lead: leadId ? ({ id: leadId } as any) : null,
    });

    if (propertyIds && propertyIds.length > 0) {
      event.properties = await this.propertyRepository.find({
        where: { id: In(propertyIds) },
      });
    }

    return await this.eventRepository.save(event);
  }

  async findAll(userId: string): Promise<Event[]> {
    return await this.eventRepository.find({
      where: { owner: { id: userId } },
      relations: ['lead', 'properties'],
      order: { startTime: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['lead', 'properties'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string): Promise<Event> {
    const event = await this.findOne(id, userId);
    const { propertyIds, leadId, ...updateData } = updateEventDto;

    Object.assign(event, updateData);

    if (leadId !== undefined) {
      event.lead = leadId ? ({ id: leadId } as any) : null;
    }

    if (propertyIds) {
      event.properties = await this.propertyRepository.find({
        where: { id: In(propertyIds) },
      });
    }

    return await this.eventRepository.save(event);
  }

  async remove(id: string, userId: string): Promise<void> {
    const event = await this.findOne(id, userId);
    await this.eventRepository.remove(event);
  }
}
