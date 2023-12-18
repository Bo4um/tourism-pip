import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GuideModule } from './guide/guide.module';
import { GroupModule } from './group/group.module';
import { TouristModule } from './tourist/tourist.module';
import { LandmarkModule } from './landmark/landmark.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    GuideModule,
    GroupModule,
    TouristModule,
    LandmarkModule,
    ScheduleModule,
  ],
})
export class AppModule {}
