import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const userInDb = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (userInDb) {
      throw new ForbiddenException('This username is already in use');
    }
    const hash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        hash,
      },
    });
    delete user.hash;
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.map((user) => delete user.hash);
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
    delete user.hash;
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        roles: true,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const hash = await argon2.hash(updateUserDto.password);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: updateUserDto.username,
        // hash,
      },
    });
    delete updatedUser.hash;
    return updatedUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`User with id = ${id} was not found`);
      });
    delete deleteUser.hash;
    return deleteUser;
  }
}
