import { Closure } from '../entities/closure.entity';
import { CreateClosureDto } from '../dto/create-closure.dto';
import { UpdateClosureDto } from '../dto/update-closure.dto';

export interface IClosuresRepository {
  create(createClosureDto: CreateClosureDto, userId: string): Promise<Closure>;
  findAll(userId: string): Promise<Closure[]>;
  findOne(id: string, userId: string): Promise<Closure>;
  update(id: string, updateClosureDto: UpdateClosureDto, userId: string): Promise<Closure>;
  remove(id: string, userId: string): Promise<void>;
  getStats(userId: string): Promise<{ totalIncome: number; salesCommission: number; rentalCommission: number }>;
}

export const IClosuresRepository = Symbol('IClosuresRepository');
