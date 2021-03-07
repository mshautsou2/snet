import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository])],
  providers: [PermissionService, PermissionController],
  exports: [PermissionService, PermissionController],
})
export class PermissionsModule {}
