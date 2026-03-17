import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Lead } from './entities/lead.entity';
import { LeadStatus } from './enums/lead.enums';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import type { ILeadsRepository } from './interfaces/leads-repository.interface';

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

  async update(id: string, updateLeadDto: UpdateLeadDto, agentId: string): Promise<Lead> {
    const lead = await this.findOne(id);

    // Solo el agente asignado o un admin (simplificado)
    if (lead.assignedAgentId !== agentId) {
       throw new Error('You do not have permission to edit this lead');
    }

    return this.leadsRepository.update(id, updateLeadDto);
  }

  async remove(id: string, agentId: string): Promise<void> {
    const lead = await this.findOne(id);
    
    if (lead.assignedAgentId !== agentId) {
      throw new Error('You do not have permission to delete this lead');
    }

    await this.leadsRepository.remove(lead);
  }
}
