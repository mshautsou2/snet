import { SetMetadata } from '@nestjs/common';

export const WITH_OWNER_DECORATOR_KEY = 'with_owner_decorator_key';

export type WithOwnerConfig = boolean;

export const WithOwner = () => SetMetadata(WITH_OWNER_DECORATOR_KEY, true);
