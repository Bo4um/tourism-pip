import { IsDate, IsInt } from 'class-validator';

export class CreateScheduleDto {
  @IsDate()
  dateOfVisit: Date;
  @IsInt()
  landmarkId: number;
}
