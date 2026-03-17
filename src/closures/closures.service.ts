import { Injectable, Inject } from '@nestjs/common';
import { CreateClosureDto } from './dto/create-closure.dto';
import { UpdateClosureDto } from './dto/update-closure.dto';
import { IClosuresRepository } from './repositories/closures.repository.interface';

@Injectable()
export class ClosuresService {
  constructor(
    @Inject(IClosuresRepository)
    private readonly closuresRepository: IClosuresRepository,
  ) {}

  create(createClosureDto: CreateClosureDto, userId: string) {
    return this.closuresRepository.create(createClosureDto, userId);
  }

  findAll(userId: string) {
    return this.closuresRepository.findAll(userId);
  }

  findOne(id: string, userId: string) {
    return this.closuresRepository.findOne(id, userId);
  }

  update(id: string, updateClosureDto: UpdateClosureDto, userId: string) {
    return this.closuresRepository.update(id, updateClosureDto, userId);
  }

  remove(id: string, userId: string) {
    return this.closuresRepository.remove(id, userId);
  }

  getStats(userId: string) {
    return this.closuresRepository.getStats(userId);
  }
}
