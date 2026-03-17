import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Lead } from '../entities/lead.entity';
import { LeadStatus } from '../enums/lead.enums';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { ILeadsRepository } from '../interfaces/leads-repository.interface';
import { Property } from '../../properties/entities/property.entity';

@Injectable()
export class LeadsTypeOrmRepository implements ILeadsRepository {
  constructor(
    @InjectRepository(Lead)
    private readonly repository: Repository<Lead>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createLeadDto: CreateLeadDto, agentId: string): Promise<Lead> {
    const { propertyIds, ...leadData } = createLeadDto;
    
    const lead = this.repository.create({
      ...leadData,
      assignedAgentId: agentId,
    });

    if (propertyIds && propertyIds.length > 0) {
      lead.properties = await this.propertyRepository.find({
        where: { id: In(propertyIds) }
      });
    }

    return this.repository.save(lead);
  }

  async findAll(query?: { status?: LeadStatus; agentId?: string }): Promise<Lead[]> {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.agentId) where.assignedAgentId = query.agentId;

    return this.repository.find({
      where,
      relations: ['assignedAgent', 'properties'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Lead | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['assignedAgent', 'properties'],
    });
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const { propertyIds, ...leadData } = updateLeadDto;
    
    const lead = await this.findOne(id);
    if (!lead) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    Object.assign(lead, leadData);

    if (propertyIds) {
      lead.properties = await this.propertyRepository.find({
        where: { id: In(propertyIds) }
      });
    }

    return this.repository.save(lead);
  }

  async remove(lead: Lead): Promise<void> {
    await this.repository.remove(lead);
  }
}
