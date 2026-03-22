import { Injectable, NotFoundException, Inject, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
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

  async update(id: string, updatePropertyDto: UpdatePropertyDto, user: User, image?: Express.Multer.File): Promise<Property> {
    const property = await this.findOne(id);

    // Permitir si es el dueño, Admin o Agente
    if (property.agentId !== user.id && user.role !== 'Admin' && user.role !== 'Agente') {
      throw new ForbiddenException(`No tienes permiso para editar esta propiedad. Tu rol: ${user.role}`);
    }

    if (image) {
      const upload = await this.cloudinaryService.uploadImage(image);
      updatePropertyDto.image = upload.secure_url;
    }

    return this.propertyRepository.update(id, updatePropertyDto);
  }

  async remove(id: string, user: User): Promise<void> {
    const property = await this.findOne(id);
    
    // Permitir si es el dueño, Admin o Agente
    if (property.agentId !== user.id && user.role !== 'Admin' && user.role !== 'Agente') {
      throw new ForbiddenException(`No tienes permiso para eliminar esta propiedad. Tu rol: ${user.role}`);
    }

    await this.propertyRepository.remove(property);
  }
}
