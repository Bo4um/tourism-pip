import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuideService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateGuideDto) {
    const guide = await this.prisma.guide.create({
      data: {
        fullName: dto.fullName,
        userId: dto.userId,
      },
    });
    return guide;
  }

  async findAll() {
    const guides = await this.prisma.guide.findMany();
    return guides;
  }

  async findOne(id: number) {
    const guide = await this.prisma.guide.findUnique({
      where: {
        id: id,
      },
    });
    if (!guide) {
      throw new NotFoundException(`Guide with id = ${id} was not found`);
    }
    return guide;
  }

  async update(id: number, dto: UpdateGuideDto) {
    const updatedGuide = await this.prisma.guide.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return updatedGuide;
  }

  async remove(id: number) {
    const deleteGuide = await this.prisma.guide
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Guide with id = ${id} was not found`);
      });
    return deleteGuide;
  }
}
