import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ACCESS_KEY = 'public_access';
export const Public = () =>
  SetMetadata(PUBLIC_ACCESS_KEY, true);
