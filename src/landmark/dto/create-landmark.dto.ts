import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLandmarkDto {
  @ApiProperty()
  @IsString()
  landmarkName: string;
  @ApiProperty()
  @IsDateString()
  dateTime: Date;
  @ApiProperty()
  @IsInt()
  groupId: number;
  @IsOptional()
  @ApiProperty()
  @IsInt()
  guideId: number;
}
