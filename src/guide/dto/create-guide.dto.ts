import { IsInt, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsString()
  fullName: string;
  @IsInt()
  userId: number;
}
