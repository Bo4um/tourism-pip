import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;
  @ApiProperty({ example: '12345678' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
