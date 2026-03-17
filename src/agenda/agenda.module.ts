import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Event } from './entities/event.entity';
import { Property } from '../properties/entities/property.entity';
import { IAgendaRepository } from './repositories/agenda.repository.interface';
import { AgendaTypeOrmRepository } from './repositories/agenda.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Property])],
  controllers: [AgendaController],
  providers: [
    AgendaService,
    {
      provide: IAgendaRepository,
      useClass: AgendaTypeOrmRepository,
    },
  ],
  exports: [AgendaService],
})
export class AgendaModule {}
