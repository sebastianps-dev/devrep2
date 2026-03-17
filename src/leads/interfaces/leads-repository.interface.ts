import { Lead } from '../entities/lead.entity';
import { LeadStatus } from '../enums/lead.enums';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';

export interface ILeadsRepository {
  create(createLeadDto: CreateLeadDto, agentId: string): Promise<Lead>;
  findAll(query?: { status?: LeadStatus; agentId?: string }): Promise<Lead[]>;
  findOne(id: string): Promise<Lead | null>;
  update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead>;
  remove(lead: Lead): Promise<void>;
}
