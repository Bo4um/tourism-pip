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
import { LandmarkService } from './landmark.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/auth/roles-auth.decorator';

@UseGuards(RolesGuard)
@ApiBearerAuth()
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  // @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateLandmarkDto) {
    return this.landmarkService.create(dto);
  }

  @Get()
  findAll() {
    return this.landmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landmarkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLandmarkDto) {
    return this.landmarkService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landmarkService.remove(+id);
  }
}
