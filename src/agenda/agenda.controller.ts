import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgendaService } from './agenda.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('agenda')
@UseGuards(AuthGuard('jwt'))
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @ActiveUser() user: User) {
    return this.agendaService.create(createEventDto, user.id);
  }

  @Get()
  findAll(@ActiveUser() user: User) {
    return this.agendaService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User) {
    return this.agendaService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @ActiveUser() user: User,
  ) {
    return this.agendaService.update(id, updateEventDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User) {
    return this.agendaService.remove(id, user.id);
  }
}
