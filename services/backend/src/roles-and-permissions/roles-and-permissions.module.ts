import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/roles-and-permissions/entities/permission.entity';
import { PermissionController } from './controllers/permission.controller';
import { Role } from './entities/role.entity';
import { PermissionService } from './services/permission.service';
import { RolesAndPermissionsService } from './services/roles-and-permissions.service';
import { RolesService } from './services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [PermissionService, RolesService, RolesAndPermissionsService],
  exports: [PermissionService, RolesService, RolesAndPermissionsService],
  controllers: [PermissionController],
})
export class RolesAndPermissionsModule { }
