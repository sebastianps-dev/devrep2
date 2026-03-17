import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Query
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadStatus } from './enums/lead.enums';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('leads')
@UseGuards(AuthGuard('jwt'))
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto, @ActiveUser() user: User) {
    return this.leadsService.create(createLeadDto, user.id);
  }

  @Get()
  findAll(
    @Query('status') status?: LeadStatus,
    @Query('agentId') agentId?: string,
  ) {
    return this.leadsService.findAll({ status, agentId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateLeadDto: UpdateLeadDto,
    @ActiveUser() user: User
  ) {
    return this.leadsService.update(id, updateLeadDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User) {
    return this.leadsService.remove(id, user.id);
  }
}
