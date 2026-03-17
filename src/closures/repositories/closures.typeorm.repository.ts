import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Closure, ClosureOperationType } from '../entities/closure.entity';
import { IClosuresRepository } from './closures.repository.interface';
import { CreateClosureDto } from '../dto/create-closure.dto';
import { UpdateClosureDto } from '../dto/update-closure.dto';

@Injectable()
export class ClosuresTypeOrmRepository implements IClosuresRepository {
  constructor(
    @InjectRepository(Closure)
    private readonly closureRepository: Repository<Closure>,
  ) {}

  async create(createClosureDto: CreateClosureDto, userId: string): Promise<Closure> {
    const { propertyId, leadId, ...closureData } = createClosureDto;

    const closure = this.closureRepository.create({
      ...closureData,
      owner: { id: userId } as any,
      property: propertyId ? ({ id: propertyId } as any) : null,
      lead: leadId ? ({ id: leadId } as any) : null,
    });

    return await this.closureRepository.save(closure);
  }

  async findAll(userId: string): Promise<Closure[]> {
    return await this.closureRepository.find({
      where: { owner: { id: userId } },
      relations: ['property', 'lead'],
      order: { closureDate: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Closure> {
    const closure = await this.closureRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['property', 'lead'],
    });

    if (!closure) {
      throw new NotFoundException(`Closure with ID ${id} not found`);
    }

    return closure;
  }

  async update(id: string, updateClosureDto: UpdateClosureDto, userId: string): Promise<Closure> {
    const closure = await this.findOne(id, userId);
    const { propertyId, leadId, ...updateData } = updateClosureDto;

    Object.assign(closure, updateData);

    if (propertyId !== undefined) {
      closure.property = propertyId ? ({ id: propertyId } as any) : null;
    }
    if (leadId !== undefined) {
      closure.lead = leadId ? ({ id: leadId } as any) : null;
    }

    return await this.closureRepository.save(closure);
  }

  async remove(id: string, userId: string): Promise<void> {
    const closure = await this.findOne(id, userId);
    await this.closureRepository.remove(closure);
  }

  async getStats(userId: string): Promise<{ totalIncome: number; salesCommission: number; rentalCommission: number }> {
    const closures = await this.closureRepository.find({
      where: { owner: { id: userId } },
    });

    const stats = closures.reduce(
      (acc, curr) => {
        const commission = Number(curr.commission);
        acc.totalIncome += commission;
        if (curr.operationType === ClosureOperationType.VENTA) {
          acc.salesCommission += commission;
        } else {
          acc.rentalCommission += commission;
        }
        return acc;
      },
      { totalIncome: 0, salesCommission: 0, rentalCommission: 0 },
    );

    return stats;
  }
}
