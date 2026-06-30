import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TargetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;
}
