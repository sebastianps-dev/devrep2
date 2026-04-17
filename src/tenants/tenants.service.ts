import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async findByHostname(hostname: string): Promise<Tenant> {
    // 1. Intentar buscar por dominio personalizado exacto
    let tenant = await this.tenantRepository.findOne({
      where: { customDomain: hostname },
    });

    if (tenant) return tenant;

    // 2. Intentar buscar por subdominio
    // Si el dominio es "agencia.casas.com", el subdominio es "agencia"
    // Nota: Esto depende de cómo se configure el dominio base.
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const subdomain = parts[0];
      tenant = await this.tenantRepository.findOne({
        where: { subdomain },
      });
      if (tenant) return tenant;
    }

    // 3. Fallback para localhost (desarrollo)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Intentar devolver el primer inquilino que exista o uno por defecto
      tenant = await this.tenantRepository.findOne({ where: {} });
      if (tenant) return tenant;
    }

    throw new NotFoundException(`No se encontró configuración para el host: ${hostname}`);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(data);
    return this.tenantRepository.save(tenant);
  }
}
