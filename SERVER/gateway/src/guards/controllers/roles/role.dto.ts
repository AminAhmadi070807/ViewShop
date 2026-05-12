import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    type: 'string',
    description: 'ایدی پرمیژن',
    example: '',
    nullable: false,
    minLength: 36,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'ایدی سینگیولار نباید خالی باشد' })
  @IsString({ message: 'ایدی سینگیولار باید یک uuid معتبر باشد' })
  @IsUUID()
  singularId: string;

  @ApiProperty({
    type: 'string',
    description: 'ایدی نقش',
    example: '',
    nullable: false,
    minLength: 36,
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'ایدی نقش نباید خالی باشد' })
  @IsString({ message: 'ایدی نقش باید یک uuid معتبر باشد' })
  @IsUUID()
  roleId: string;
}
