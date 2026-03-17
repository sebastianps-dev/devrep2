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
import { ClosuresService } from './closures.service';
import { CreateClosureDto } from './dto/create-closure.dto';
import { UpdateClosureDto } from './dto/update-closure.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('closures')
@UseGuards(AuthGuard('jwt'))
export class ClosuresController {
  constructor(private readonly closuresService: ClosuresService) {}

  @Post()
  create(@Body() createClosureDto: CreateClosureDto, @ActiveUser() user: User) {
    return this.closuresService.create(createClosureDto, user.id);
  }

  @Get()
  findAll(@ActiveUser() user: User) {
    return this.closuresService.findAll(user.id);
  }

  @Get('stats')
  getStats(@ActiveUser() user: User) {
    return this.closuresService.getStats(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User) {
    return this.closuresService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClosureDto: UpdateClosureDto,
    @ActiveUser() user: User,
  ) {
    return this.closuresService.update(id, updateClosureDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User) {
    return this.closuresService.remove(id, user.id);
  }
}
