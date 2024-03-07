import { Module } from '@nestjs/common';
import { TouristService } from './tourist.service';
import { TouristController } from './tourist.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TouristController],
  providers: [TouristService],
  imports: [JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: {
      expiresIn: '1h',
    },
  }),]
})
export class TouristModule {}
