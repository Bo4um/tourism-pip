import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateLandmarkDto {
  @IsString()
  landmarkName: string;
  @IsDateString()
  dateTime: Date;
  @IsInt()
  groupId: number;
  @IsInt()
  guideId: number;
}
