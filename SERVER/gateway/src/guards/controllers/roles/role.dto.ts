import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
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
  @IsNotEmpty({ message: 'ایدی پرمیژن نباید خالی باشد' })
  @IsString({ message: 'ایدی پرمیژن باید یک uuid معتبر باشد' })
  @IsUUID()
  permissionId: string;

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
  @IsOptional()
  roleId: string;
}
