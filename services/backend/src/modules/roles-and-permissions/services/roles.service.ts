import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { getConnection, Repository } from 'typeorm';
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
}