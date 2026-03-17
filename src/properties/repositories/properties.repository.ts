import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertyStatus } from '../enums/property.enums';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { IPropertiesRepository } from '../interfaces/properties-repository.interface';

@Injectable()
export class PropertiesTypeOrmRepository implements IPropertiesRepository {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, agentId: string): Promise<Property> {
    const property = this.repository.create({
      ...createPropertyDto,
      agentId,
    });
    return this.repository.save(property);
  }

  async findAll(query?: { status?: PropertyStatus; agentId?: string }): Promise<Property[]> {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.agentId) where.agentId = query.agentId;

    return this.repository.find({
      where,
      relations: ['agent'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Property | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['agent'],
    });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    await this.repository.update(id, updatePropertyDto);
    const updatedProperty = await this.findOne(id);
    if (!updatedProperty) {
      throw new Error(`Property with ID ${id} not found after update`);
    }
    return updatedProperty;
  }

  async remove(property: Property): Promise<void> {
    await this.repository.remove(property);
  }
}
