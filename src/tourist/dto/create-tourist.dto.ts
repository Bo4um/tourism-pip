import { IsInt, IsString } from 'class-validator';

export class CreateTouristDto {
  @IsString()
  fullName: string;
  @IsInt()
  userId: number;
  @IsInt()
  groupId: number;
}
