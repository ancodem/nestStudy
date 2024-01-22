import { IsNotEmpty, IsString } from 'class-validator';

export class FindTopPageDto {
  @IsNotEmpty()
  @IsString()
  firstCategory: string;
}
