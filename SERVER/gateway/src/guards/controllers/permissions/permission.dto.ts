import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionEnum } from '../../../common/enums/guards/permission/permission.enum';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'ساخت پرمیژن جدید',
    example: PermissionEnum.CREATE,
    enum: PermissionEnum,
    type: 'string',
  })
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsEnum(PermissionEnum, {
    message:
      'عنوان باید یکی از این مقدار ها باشد CREATE, READ, EDIT, DELETE, REJECT, CANCEL, REFUND, CHANGE_STATUS, CHANGE_ROLE, MANAGE, EXPORT, IMPORT, ALL',
  })
  title: PermissionEnum;
}
