import { IsUUID } from 'class-validator';

export class DeleteOneParams {
  @IsUUID()
  id: string;
}
