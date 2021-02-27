import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { PermissionService } from "./permission.service";
import { RolesService } from "./roles.service";
import {getConnection} from "typeorm";

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
            
        // const role = await this.roleService.findOne(roleId)
        // const permission = await this.permissionService.findOne(permissionId)

        // role.permissions.push(permission);
        // this.roleService.update(roleId, role);
    }
}

/*
===> roles
<=== permissions
SELECT * FROM role
    LEFT JOIN role_permission on 
    


*/