import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDTO } from 'src/modules/roles-and-permissions/dto/create-permission.dto';
import { Permission } from 'src/modules/roles-and-permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { PermissionsKeys } from '../constants/permissions-keys.constants';
import { UpdatePermissionDTO } from '../dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }

  async create(permission: CreatePermissionDTO): Promise<Permission> {
    const savedPermission = await this.permissionRepository.save(permission);
    return savedPermission;
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  findOne(id: string): Promise<Permission> {
    return this.permissionRepository.findOne(id);
  }

  findByKey(key: PermissionsKeys): Promise<Permission> {
    return this.permissionRepository.findOne({
      where: {
        key,
      }
    })
  }

  async update(id: string, dto: UpdatePermissionDTO): Promise<Permission> {
    const toUpdate = await this.permissionRepository.findOne({ id: id });
    if (!toUpdate) {
      throw new NotFoundException(`Permission with id "${dto.id}" not found`);
    }
    return await this.permissionRepository.save(dto);
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new NotFoundException(`Permission ID does not exists`);
    }
    const toDelete = await this.permissionRepository.delete(id);
    if (toDelete.affected === 0) {
      throw new NotFoundException(`Permission with id "${id}" not found`);
    }
  }

  private buildPermissionResponse(permission: Permission) {
    return {
      id: permission.id,
      title: permission.title,
    };
  }
}