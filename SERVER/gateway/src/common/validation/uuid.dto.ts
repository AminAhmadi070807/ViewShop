import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUUID {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: '',
  })
  @IsUUID('4', { message: 'شناسه نامعتیر است' })
  id: string;
}
