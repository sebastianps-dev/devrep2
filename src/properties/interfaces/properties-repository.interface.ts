import { Property } from '../entities/property.entity';
import { PropertyStatus } from '../enums/property.enums';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

export interface IPropertiesRepository {
  create(createPropertyDto: CreatePropertyDto, agentId: string): Promise<Property>;
  findAll(query?: { status?: PropertyStatus; agentId?: string }): Promise<Property[]>;
  findOne(id: string): Promise<Property | null>;
  update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property>;
  remove(property: Property): Promise<void>;
}
