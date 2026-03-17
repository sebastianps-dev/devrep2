import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Lead } from '../leads/entities/lead.entity';
import { Property } from '../properties/entities/property.entity';
import { Event } from '../agenda/entities/event.entity';
import { Closure } from '../closures/entities/closure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Property, Event, Closure])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
