import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ACCESS_KEY = 'PUBLIC_ACCESS_DECORATOR';

export const PublicAccess = () => SetMetadata(IS_PUBLIC_ACCESS_KEY, true);
