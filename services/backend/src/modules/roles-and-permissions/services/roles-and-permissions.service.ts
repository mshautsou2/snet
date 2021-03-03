import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/user.entity";
import { getConnection } from "typeorm";
import { PermissionsKeys } from "../constants/permissions-keys.constants";
import { Role } from "../entities/role.entity";
import { PermissionService } from "./permission.service";
import { RolesService } from "./roles.service";

@Injectable()
export class RolesAndPermissionsService {

    constructor(
        private permissionService: PermissionService,
        private roleService: RolesService,
    ) {

    }

    async addPermission(roleId: string, permissionId: string) { //TODO: Optimize with Query Builder

        await getConnection()
            .createQueryBuilder()
            .relation(Role, "permissions")
            .of(roleId)
            .add(permissionId)
    }

    async checkPermissions(userId: string, ...permissions: PermissionsKeys[]) {
        if (!userId) {
            return false;
        }
        return await getConnection()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.id = :userId', { userId })
            .leftJoin('user.roles', 'role')
            .leftJoin('role.permissions', 'permission')
            .where('permission.key IN (:...permissions)', { permissions })
            .select('TOP 1')
            .getCount() > 0;
    }

}