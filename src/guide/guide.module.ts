import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GuideController],
  providers: [GuideService],
  imports: [JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: {
      expiresIn: '1h',
    },
  }),]
})
export class GuideModule {}
