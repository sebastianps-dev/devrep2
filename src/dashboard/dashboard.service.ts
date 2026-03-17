import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { Lead } from '../leads/entities/lead.entity';
import { Property } from '../properties/entities/property.entity';
import { Event } from '../agenda/entities/event.entity';
import { Closure, ClosureOperationType } from '../closures/entities/closure.entity';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Closure)
    private readonly closureRepository: Repository<Closure>,
  ) {}

  async getStats(userId: string): Promise<DashboardStatsDto> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // KPI Data
    const closures = await this.closureRepository.find({
      where: { 
        owner: { id: userId },
        closureDate: Between(firstDayOfMonth, now)
      }
    });

    const totalSalesMonth = closures
      .filter(c => c.operationType === ClosureOperationType.VENTA)
      .reduce((acc, curr) => acc + Number(curr.totalValue), 0);

    const totalRentalsMonth = closures
      .filter(c => c.operationType === ClosureOperationType.ALQUILER)
      .reduce((acc, curr) => acc + Number(curr.totalValue), 0);

    const activeLeadsCount = await this.leadRepository.count({
      where: { assignedAgent: { id: userId } } 
    });

    // Lead Status Breakdown
    const leadStats = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.status', 'label')
      .addSelect('COUNT(*)', 'value')
      .where('lead.assignedAgentId = :userId', { userId })
      .groupBy('lead.status')
      .getRawMany();

    // Property Status Breakdown
    const propertyStats = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.status', 'label')
      .addSelect('COUNT(*)', 'value')
      .groupBy('property.status')
      .getRawMany();

    return {
      kpis: {
        totalSalesMonth,
        totalRentalsMonth,
        activeLeads: activeLeadsCount,
        conversionRate: 18.5, // Mocked for now
        avgClosureDays: 42, // Mocked for now
      },
      leadStatus: leadStats,
      propertyStatus: propertyStats,
      charts: {
        salesVsRentals: {
          labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'],
          data1: [30, 45, 35, 60, 55, 80],
          data2: [40, 35, 50, 45, 65, 60]
        },
        conversionVsLeads: {
          labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'],
          data1: [12, 18, 15, 22, 25, 18],
          data2: [60, 80, 75, 95, 110, 128]
        }
      }
    };
  }

  async getTodayAgenda(userId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return await this.eventRepository.find({
      where: {
        owner: { id: userId },
        startTime: Between(startOfDay, endOfDay)
      },
      order: { startTime: 'ASC' }
    });
  }
}
