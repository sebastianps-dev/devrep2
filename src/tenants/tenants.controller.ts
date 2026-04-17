import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('site/:hostname')
  async getSiteConfig(@Param('hostname') hostname: string) {
    return this.tenantsService.findByHostname(hostname);
  }

  @Get()
  async findAll() {
    return this.tenantsService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<Tenant>) {
    return this.tenantsService.create(data);
  }
}
