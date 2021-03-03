import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { getConnection, Repository } from 'typeorm';
import { RolesKeys } from './roles-keys.constants';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './role.entity';
import { PermissionService } from '../permissions/permission.service';
import { PermissionsKeys } from '../permissions/permissions-keys.constants';
import { UpdateRoleDTO } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
    private roleService: RolesService,
  ) { }

  async addPermission(roleId: string, permissionId: string) {

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

  async create(role: CreateRoleDTO): Promise<Role> {
    const savedRole = await this.roleRepository.save(role);
    return savedRole;
  }


  findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  findByKey(key: RolesKeys): Promise<Role> {
    return this.roleRepository.findOne({
      where: {
        key,
      }
    })
  }

  async update(id: string, dto: UpdateRoleDTO): Promise<Role> {
    const toUpdate = await this.roleRepository.findOne({ id: id });
    if (!toUpdate) {
      throw new NotFoundException(`Role with id "${dto.id}" not found`);
    }
    return await this.roleRepository.save(toUpdate);
  }
}