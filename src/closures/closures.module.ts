import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClosuresService } from './closures.service';
import { ClosuresController } from './closures.controller';
import { Closure } from './entities/closure.entity';
import { IClosuresRepository } from './repositories/closures.repository.interface';
import { ClosuresTypeOrmRepository } from './repositories/closures.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Closure])],
  controllers: [ClosuresController],
  providers: [
    ClosuresService,
    {
      provide: IClosuresRepository,
      useClass: ClosuresTypeOrmRepository,
    },
  ],
  exports: [ClosuresService],
})
export class ClosuresModule {}
