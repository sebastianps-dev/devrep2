import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './entities/lead.entity';
import { LeadsTypeOrmRepository } from './repositories/leads.repository';
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Property])],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: 'ILeadsRepository',
      useClass: LeadsTypeOrmRepository,
    },
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
