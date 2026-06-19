import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Media } from '../../media/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class StoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  title: string;

  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsUUID()
  media: string;

  @IsNotEmpty()
  @IsUUID()
  story: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  like: number;

  @IsNotEmpty()
  @IsUUID()
  category: string;
}
