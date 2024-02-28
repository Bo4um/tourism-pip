import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsDateString()
  dateOfVisit: Date;
  @ApiProperty()
  @IsInt()
  landmarkId: number;
}
