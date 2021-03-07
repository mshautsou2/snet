import { NotFoundError } from './core/not-found.error';

export class ModelNotFoundError extends NotFoundError {
  constructor(public entity: string, public identifier: string) {
    super(`${entity} with "${identifier}" not found`);
  }
}
