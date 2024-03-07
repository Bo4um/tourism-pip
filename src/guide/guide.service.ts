import { ForbiddenException, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { group } from 'console';
import { UsersService } from 'src/users/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class GuideService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private usersService: UsersService) {}
  async create(dto: CreateGuideDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (user) {
      throw new ForbiddenException('This username is already in use');
    }
    const hash = await argon2.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        hash,
      },
    });
    const newGuide = await this.prisma.guide.create({
      data: {
        userId: newUser.id,
        fullName: dto.fullName
      }
    });
    const newUserWithRoles = await this.prisma.user.update({
      where: { id: newUser.id },
      data: {
        roles: {
          connect: [{ id: 3 }, { id: 4 }],
        },
      },
      include: {
        roles: true,
      },
    });
    return newGuide;
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

  async getSchedules(@Req() req) {
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
        guide: true,
      }
    });

    const guide = user.guide;

    const landmarks = await this.prisma.landmark.findMany({
      where: {
        guideId: guide.id,
      }
    })

    console.log(landmarks);
    

    const schedules = await this.prisma.schedule.findMany({
      where: {
        landmark: {
          guideId: guide.id,
        }
      }
    });
    
    return schedules;
  }

  async getGroups(@Req() req) {
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
        guide: true,
      }
    });

    const guide = user.guide;

    let landmarks = await this.prisma.landmark.findMany({
      where: {
        guideId: guide.id,
      },
      include: {
        group: true,
      }
    });

    const groups = landmarks.map(landmark => landmark.group);
    
    return groups;
  }
}
