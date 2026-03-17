import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  // Podríamos añadir un guard aquí para que solo se ejecute en desarrollo o por un admin real
  async runSeed() {
    return await this.seedService.runSeed();
  }
}
