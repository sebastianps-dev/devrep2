import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { Property } from './entities/property.entity';
import { PropertyStatus } from './enums/property.enums';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { User } from '../users/entities/user.entity';
import type { IPropertiesRepository } from './interfaces/properties-repository.interface';

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('IPropertiesRepository')
    private readonly propertyRepository: IPropertiesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, user: User, image?: Express.Multer.File): Promise<Property> {
    if (image) {
      const upload = await this.cloudinaryService.uploadImage(image);
      createPropertyDto.image = upload.secure_url;
    }
    return this.propertyRepository.create(createPropertyDto, user.id);
  }

  async findAll(query?: { status?: PropertyStatus; agentId?: string }): Promise<Property[]> {
    return this.propertyRepository.findAll(query);
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string, image?: Express.Multer.File): Promise<Property> {
    const property = await this.findOne(id);

    if (property.agentId !== userId) {
      throw new Error('You do not have permission to edit this property');
    }

    if (image) {
      const upload = await this.cloudinaryService.uploadImage(image);
      updatePropertyDto.image = upload.secure_url;
    }

    return this.propertyRepository.update(id, updatePropertyDto);
  }

  async remove(id: string, userId: string): Promise<void> {
    const property = await this.findOne(id);
    
    if (property.agentId !== userId) {
      throw new Error('You do not have permission to delete this property');
    }

    await this.propertyRepository.remove(property);
  }
}
