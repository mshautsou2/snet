import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'src/modules/shared/services/base-entity-service';
import { ClassType } from 'src/modules/shared/types/class.type';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService extends BaseCRUDService<Permission> {
  constructor(protected repository: PermissionRepository) {
    super();
  }

  async isOwner(entityCass: ClassType, resourceId: string, userId: string) {
    return await this.repository.isOwner(entityCass, resourceId, userId);
  }
}
