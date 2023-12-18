import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TouristService } from './tourist.service';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';

@Controller('tourist')
export class TouristController {
  constructor(private readonly touristService: TouristService) {}

  @Post()
  create(@Body() dto: CreateTouristDto) {
    return this.touristService.create(dto);
  }

  @Get()
  findAll() {
    return this.touristService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTouristDto) {
    return this.touristService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristService.remove(+id);
  }
}
