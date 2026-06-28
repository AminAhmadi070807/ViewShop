import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;
}
