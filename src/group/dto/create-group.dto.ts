import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  groupName: string;
  @IsString()
  recreationProgram: string;
  @IsString()
  hotelName: string;
}
