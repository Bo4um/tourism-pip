import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;
  @ApiProperty({ example: 'strong password' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
