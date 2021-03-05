import { NotFoundError } from './core/not-found.error';

export class EntityNotFoundError extends NotFoundError {
  constructor(public entity: string, public identifier: string) {
    super(`${entity} "${identifier}" not found`);
  }
}
