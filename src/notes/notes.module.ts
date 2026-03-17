import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { INotesRepository } from './repositories/notes.repository.interface';
import { NotesTypeOrmRepository } from './repositories/notes.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [
    NotesService,
    {
      provide: INotesRepository,
      useClass: NotesTypeOrmRepository,
    },
  ],
  exports: [NotesService],
})
export class NotesModule {}
