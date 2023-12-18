import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LandmarkService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateLandmarkDto) {
    const landmark = await this.prisma.landmark.create({
      data: {
        ...dto,
      },
    });
    return landmark;
  }

  async findAll() {
    const landmarks = await this.prisma.landmark.findMany();
    return landmarks;
  }

  async findOne(id: number) {
    const landmark = await this.prisma.landmark.findUnique({
      where: {
        id: id,
      },
    });
    if (!landmark) {
      throw new NotFoundException(`landmark with id = ${id} was not found`);
    }
    return landmark;
  }

  async update(id: number, dto: UpdateLandmarkDto) {
    const updatedLandmark = await this.prisma.landmark.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return updatedLandmark;
  }

  async remove(id: number) {
    const deleteLandmark = await this.prisma.landmark
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`landmark with id = ${id} was not found`);
      });
    return deleteLandmark;
  }
}
