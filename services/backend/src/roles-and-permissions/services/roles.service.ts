import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesKeys } from '../constants/roles-keys.constants';
import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

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



  //   findAll(): Promise<Permission[]> {
  //     return this.permissionRepository.find();
  //   }

  //   findOne(id: string): Promise<Permission> {
  //     return this.permissionRepository.findOne(id);
  //   }

  //   async update(id: string, dto: UpdatePermissionDTO): Promise<Permission> {
  //     const toUpdate = await this.permissionRepository.findOne({ id: id });
  //     if (!toUpdate) {
  //       throw new NotFoundException(`Permission with id "${dto.id}" not found`);
  //     }
  //     return await this.permissionRepository.save(dto);
  //   }

  //   async remove(id: string): Promise<void> {
  //     if (!id) {
  //       throw new NotFoundException(`Permission ID does not exists`);
  //     }
  //     const toDelete = await this.permissionRepository.delete(id);
  //     if (toDelete.affected === 0) {
  //       throw new NotFoundException(`Permission with id "${id}" not found`);
  //     }
  //   }

  //   private buildPermissionResponse(permission: Permission) {
  //     return {
  //       id: permission.id,
  //       title: permission.title,
  //     };
  //   }
}
