import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@ActiveUser() user: User) {
    return this.dashboardService.getStats(user.id);
  }

  @Get('agenda-today')
  getTodayAgenda(@ActiveUser() user: User) {
    return this.dashboardService.getTodayAgenda(user.id);
  }
}
