import { IsEnum, IsNotEmpty } from 'class-validator';
import { PermissionEnum } from '../../../common/enums/permission/permission.enum';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'عنوان نباید خالی باشد' })
  @IsEnum(PermissionEnum, {
    message:
      'عنوان باید یکی از این مقدار ها باشد CREATE, READ, EDIT, DELETE, REJECT, CANCEL, REFUND, CHANGE_STATUS, CHANGE_ROLE, MANAGE, EXPORT, IMPORT',
  })
  title: PermissionEnum;
}
