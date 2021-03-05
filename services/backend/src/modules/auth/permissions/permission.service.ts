import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'src/modules/shared/services/base-entity-service';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService extends BaseCRUDService<Permission> {
  constructor(protected repository: PermissionRepository) {
    super();
  }
}
