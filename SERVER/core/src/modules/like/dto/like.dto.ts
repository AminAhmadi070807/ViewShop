import { IsNotEmpty, IsUUID } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsUUID()
  product: string;
}
