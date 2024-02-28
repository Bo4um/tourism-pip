import { Module, forwardRef } from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { LandmarkController } from './landmark.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [LandmarkController],
  providers: [LandmarkService],
})
export class LandmarkModule {}
