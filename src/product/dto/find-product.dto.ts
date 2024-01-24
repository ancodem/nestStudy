import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindProductDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNumber()
  limit: number;
}
