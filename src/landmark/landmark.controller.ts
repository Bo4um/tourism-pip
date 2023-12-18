import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';

@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

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
