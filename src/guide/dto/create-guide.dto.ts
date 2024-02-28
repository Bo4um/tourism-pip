import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateGuideDto {
  @ApiProperty()
  @IsString()
  fullName: string;
  @ApiProperty()
  @IsInt()
  userId: number;
}
