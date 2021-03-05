import { PermissionsKeys } from 'src/modules/auth/permissions/permissions-keys.constants';
import { NotFoundError } from './core/not-found.error';

export class PermissionNotFoundError extends NotFoundError {
  constructor(idOrKey: string) {
    super(`Permission "${idOrKey}" not found`);
  }
}
