import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { Permission } from './roles-and-permissions/entities/permission.entity';
import { RolesAndPermissionsModule } from './roles-and-permissions/roles-and-permissions.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PermissionsGuard } from './roles-and-permissions/guards/permissions.guard';
import { PermissionService } from './roles-and-permissions/services/permission.service';
import { PermissionsKeys } from './roles-and-permissions/constants/permissions-keys.constants';
import { Role } from './roles-and-permissions/entities/role.entity';
import { RolesService } from './roles-and-permissions/services/roles.service';
import { RolesKeys } from './roles-and-permissions/constants/roles-keys.constants';
import { RolesAndPermissionsService } from './roles-and-permissions/services/roles-and-permissions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([Permission]),
    RolesAndPermissionsModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: PermissionsGuard }],
})
export class AppModule {

  constructor(private permissionService: PermissionService, private roleService: RolesService, private rolePermissionService: RolesAndPermissionsService) {

  }

  async onModuleInit() {
    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.AddUser,
        description: 'Add new user',
        title: 'add new user permission',
      })
      const role = await this.roleService.create({
        key: RolesKeys.User,
        title: 'Regular User',
        description: 'regular user role'
      })
      this.rolePermissionService.addPermission(role.id, permission.id);
    }
    if (0) {
      await this.roleService.create({
        key: RolesKeys.Anonymous,
        title: 'Anonymous User',
        description: 'Unauthenticated user'
      })
    }
    // console.log(`Initialization...`);
  }

}
