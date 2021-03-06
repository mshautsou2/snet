import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [RolesService, RoleController],
  exports: [RolesService, RoleController],
})
export class RoleModule {}
