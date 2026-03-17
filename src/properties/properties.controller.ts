import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyStatus } from './enums/property.enums';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('properties')
@UseGuards(AuthGuard('jwt'))
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createPropertyDto: CreatePropertyDto, 
    @ActiveUser() user: User,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.propertiesService.create(createPropertyDto, user, image);
  }

  @Get()
  findAll(
    @Query('status') status?: PropertyStatus,
    @Query('agentId') agentId?: string,
  ) {
    return this.propertiesService.findAll({ status, agentId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string, 
    @Body() updatePropertyDto: UpdatePropertyDto,
    @ActiveUser() user: User,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.propertiesService.update(id, updatePropertyDto, user.id, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User) {
    return this.propertiesService.remove(id, user.id);
  }
}
