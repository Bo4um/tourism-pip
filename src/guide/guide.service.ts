import { Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { group } from 'console';

@Injectable()
export class GuideService {
  constructor(private prisma: PrismaService, private jwt: JwtService,) {}
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

  // async getSchedules(@Req() req) {
  //   const authHeader = req.headers.authorization;

  //   const bearer = authHeader.split(' ')[0];
  //   const token = authHeader.split(' ')[1];

  //   if (bearer !== 'Bearer' || !token) {
  //     throw new UnauthorizedException('User is not authorized');
  //   }

  //   const tokenPayload = this.jwt.verify(token, {
  //     secret: process.env.JWT_ACCESS_SECRET,
  //   });

  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: tokenPayload.sub,
  //     },
  //     include: {
  //       roles: true,
  //       guide: {
  //         include: {
            
  //         }
  //       },
  //     }
  //   });

  //   const foundTourist = user.tourist;

  //   console.log(user);
    
  // }
}
