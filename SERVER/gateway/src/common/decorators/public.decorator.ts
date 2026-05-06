import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'ROLE_PUBLIC_DECORATOR';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
