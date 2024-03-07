import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  fullName: string;
}
