import { Injectable } from '@nestjs/common';
import { BaseCRUDService } from 'src/modules/shared/services/base-entity-service';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { RolesKeys } from './roles-keys.constants';

@Injectable()
export class RolesService extends BaseCRUDService<Role> {
  constructor(protected repository: RoleRepository) {
    super();
  }

  async findByKey(key: RolesKeys) {
    return await this.repository.findByKey(key);
  }

  async addPermissionAssociation(roleId: string, permissionId: string) {
    await this.repository.addPermissionAssociation(roleId, permissionId);
  }

  async hasPermissions(userId: string, ...permissions: PermissionsKeys[]) {
    return await this.repository.hasPermissions(userId, ...permissions);
  }
}
