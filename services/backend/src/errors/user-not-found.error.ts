import { NotFoundError } from './core/not-found.error';

export class UserNotFoundError extends NotFoundError {
  constructor(idOrKey: string) {
    super(`User "${idOrKey}" not found`);
  }
}
