import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/roles-and-permissions/entities/permission.entity';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class RolesAndPermissionsModule {}
