import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './entities/property.entity';
import { PropertiesTypeOrmRepository } from './repositories/properties.repository';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), CloudinaryModule],
  controllers: [PropertiesController],
  providers: [
    PropertiesService,
    {
      provide: 'IPropertiesRepository',
      useClass: PropertiesTypeOrmRepository,
    },
  ],
  exports: [PropertiesService],
})
export class PropertiesModule {}
