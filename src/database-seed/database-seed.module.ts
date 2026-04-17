import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Event } from '../agenda/entities/event.entity';
import { Note } from '../notes/entities/note.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Property, Lead, Event, Note, Tenant]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class DatabaseSeedModule {}
