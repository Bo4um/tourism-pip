import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'string ' })
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ example: 'strong password' })
  password: string;
}
