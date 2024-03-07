import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/user.module';

@Module({
  controllers: [GuideController],
  providers: [GuideService],
  imports: [JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: {
      expiresIn: '1h',
    },
  }),
UsersModule]
})
export class GuideModule {}
