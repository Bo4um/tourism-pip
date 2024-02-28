import {
  ForbiddenException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signin(dto: SignInDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (!user) {
      throw new ForbiddenException('Bad credentials');
    }
    const passwordsMatch = await argon2.verify(user.hash, dto.password);
    if (!passwordsMatch) {
      throw new ForbiddenException('Bad credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    console.log(typeof payload.roles);
    

    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }

  async signup(dto: SignUpDto) {
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
    const newUserWithRoles = await this.prisma.user.update({
      where: { id: newUser.id },
      data: {
        roles: {
          connect: [{ id: 3 }],
        },
      },
      include: {
        roles: true,
      },
    });
    const payload = {
      sub: newUserWithRoles.id,
      username: newUserWithRoles.username,
      roles: newUserWithRoles.roles,
    };

    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }

  async getUserFromToken(@Req() req) {
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
      }
    });

    req.user = tokenPayload;
    delete tokenPayload.sub;
    return user;
  }
}
