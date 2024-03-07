import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get('/schedules')
  async findSchedules(@Req() req) {
    return this.guideService.getSchedules(req);
  }

  @Get('/groups')
  async findGroups(@Req() req) {
    return this.guideService.getGroups(req);
  }

  @Post()
  async create(@Body() dto: CreateGuideDto) {
    return this.guideService.create(dto);
  }

  @Get()
  async findAll() {
    return this.guideService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guideService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGuideDto) {
    return this.guideService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.guideService.remove(+id);
  }

}
