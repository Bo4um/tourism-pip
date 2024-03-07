import { Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TouristService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
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

  async getAllTourists(@Req() req) {
    const authHeader = req.headers.authorization;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('User is not authorized');
    }

    const tokenPayload = this.jwt.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayload.sub,
      },
      include: {
        roles: true,
        tourist: {
          include: {
            group: true,
          }
        }
      }
    });

    const group = user.tourist?.group;

    console.log(user);

    const allTourists = await this.prisma.tourist.findMany({
      where: {
        groupId: group.id,
      }
    });

    console.log(allTourists);

    return allTourists;
    
    
  }

  async getLandmarks(@Req() req) {
    const authHeader = req.headers.authorization;

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('User is not authorized');
    }

    const tokenPayload = this.jwt.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayload.sub,
      },
      include: {
        roles: true,
        tourist: {
          include: {
            group: true,
          }
        }
      }
    });

    const group = user.tourist?.group;

    console.log(user);

    const landmarks = await this.prisma.landmark.findMany({
      where: {
        groupId: group.id,
      }
    });

    console.log(landmarks);

    return landmarks;
    
    
  }
}
