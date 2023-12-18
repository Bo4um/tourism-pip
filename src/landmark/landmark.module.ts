import { Module } from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { LandmarkController } from './landmark.controller';

@Module({
  controllers: [LandmarkController],
  providers: [LandmarkService],
})
export class LandmarkModule {}
