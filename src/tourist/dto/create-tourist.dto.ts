import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTouristDto {
  @ApiProperty()
  @IsString()
  fullName: string;
  @ApiProperty()
  @IsInt()
  userId: number;
  @ApiProperty()
  @IsInt()
  groupId: number;
}
