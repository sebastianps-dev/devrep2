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
  UploadedFile,
  UploadedFiles
} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 10 }
  ]))
  create(
    @Body() createPropertyDto: CreatePropertyDto, 
    @ActiveUser() user: User,
    @UploadedFiles() files?: { image?: Express.Multer.File[], images?: Express.Multer.File[], documents?: Express.Multer.File[] }
  ) {
    return this.propertiesService.create(createPropertyDto, user, files);
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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'documents', maxCount: 10 }
  ]))
  update(
    @Param('id') id: string, 
    @Body() updatePropertyDto: UpdatePropertyDto,
    @ActiveUser() user: User,
    @UploadedFiles() files?: { image?: Express.Multer.File[], images?: Express.Multer.File[], documents?: Express.Multer.File[] }
  ) {
    return this.propertiesService.update(id, updatePropertyDto, user, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User) {
    return this.propertiesService.remove(id, user);
  }
}
