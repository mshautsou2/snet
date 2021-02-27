import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { PermissionService } from "./permission.service";
import { RolesService } from "./roles.service";
import { getConnection } from "typeorm";
import { User } from "src/users/user.entity";
import { PermissionsKeys } from "../constants/permissions-keys.constants";

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

    async checkPermissions(permissions: PermissionsKeys[], userId: string) {
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

/*
===> roles
<=== permissions
SELECT * FROM role
    LEFT JOIN role_permission on



*/