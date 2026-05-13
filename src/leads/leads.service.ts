import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Lead } from './entities/lead.entity';
import { LeadStatus } from './enums/lead.enums';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import type { ILeadsRepository } from './interfaces/leads-repository.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('ILeadsRepository')
    private readonly leadsRepository: ILeadsRepository,
  ) {}

  async create(createLeadDto: CreateLeadDto, agentId: string): Promise<Lead> {
    return this.leadsRepository.create(createLeadDto, agentId);
  }

  async findAll(query?: { status?: LeadStatus; agentId?: string }): Promise<Lead[]> {
    return this.leadsRepository.findAll(query);
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadsRepository.findOne(id);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto, user: User): Promise<Lead> {
    const lead = await this.findOne(id);

    // Permitir si es el agente asignado o es un administrador (Admin)
    if (lead.assignedAgentId !== user.id && user.role !== 'Admin') {
       throw new Error('You do not have permission to edit this lead');
    }

    return this.leadsRepository.update(id, updateLeadDto);
  }

  async remove(id: string, user: User): Promise<void> {
    const lead = await this.findOne(id);
    
    // Permitir si es el agente asignado o es un administrador (Admin)
    if (lead.assignedAgentId !== user.id && user.role !== 'Admin') {
      throw new Error('You do not have permission to delete this lead');
    }

    await this.leadsRepository.remove(lead);
  }
}
