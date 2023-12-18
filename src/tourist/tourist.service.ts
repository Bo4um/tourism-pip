import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TouristService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateTouristDto) {
    const group = await this.prisma.tourist.create({
      data: {
        ...dto,
      },
    });
    return group;
  }

  async findAll() {
    const tourists = await this.prisma.tourist.findMany();
    return tourists;
  }

  async findOne(id: number) {
    const tourist = await this.prisma.tourist.findUnique({
      where: {
        id: id,
      },
    });
    if (!tourist) {
      throw new NotFoundException(`tourist with id = ${id} was not found`);
    }
    return tourist;
  }

  async update(id: number, dto: UpdateTouristDto) {
    const updatedTourist = await this.prisma.tourist.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return updatedTourist;
  }

  async remove(id: number) {
    const deleteTourist = await this.prisma.tourist
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`tourist with id = ${id} was not found`);
      });
    return deleteTourist;
  }
}
