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
import { CategoryModule } from './categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { TopicsModule } from './topics/topics.module';
import { SubTopicsModule } from './subtopics/subtopics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([Permission]),
    RolesAndPermissionsModule,
    UsersModule,
    CategoryModule,
    TopicsModule,
    SubTopicsModule,
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

    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.ViewCategory,
        description: 'View any category',
        title: 'view any category',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      const viewCategoryPermissions = await this.permissionService.findByKey(PermissionsKeys.ViewCategory);
      this.rolePermissionService.addPermission(role.id, viewCategoryPermissions.id);

    }

    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.EditCategory,
        description: 'Create or edit category',
        title: 'Create or edit category permission',
      })
      // const role = await this.roleService.findByKey(RolesKeys.User);

      // const editCategoryPermissions = await this.permissionService.findByKey(PermissionsKeys.EditCategory);
      // this.rolePermissionService.addPermission(role.id, editCategoryPermissions.id);
    }

    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.EditSelfCategory,
        description: 'Edit or delete own categories',
        title: 'Create or edit category permission',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      const editSelfCategoryPermissions = await this.permissionService.findByKey(PermissionsKeys.EditSelfCategory);
      this.rolePermissionService.addPermission(role.id, editSelfCategoryPermissions.id);
    }

    
    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.ViewTopic,
        description: 'Edit or delete own categories',
        title: 'Create or edit category permission',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      this.rolePermissionService.addPermission(role.id, permission.id);
      
    }
    // if (0) {
    //   const permission = await this.permissionService.create({
    //     key: PermissionsKeys.EditAnyTopic,
    //     description: 'Edit or delete own categories',
    //     title: 'Create or edit category permission',
    //   })
    //   const role = await this.roleService.findByKey(RolesKeys.Admin);

    //   this.rolePermissionService.addPermission(role.id, permission.id);
    // }

    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.EditSelfTopic,
        description: 'Edit or delete own categories',
        title: 'Create or edit category permission',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      this.rolePermissionService.addPermission(role.id, permission.id);
    }


        
    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.ViewSubTopic,
        description: 'Edit or delete own categories',
        title: 'Create or edit category permission',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      this.rolePermissionService.addPermission(role.id, permission.id);
      
    }


    if (0) {
      const permission = await this.permissionService.create({
        key: PermissionsKeys.EditSelfSubTopic,
        description: 'Edit or delete own categories',
        title: 'Create or edit category permission',
      })
      const role = await this.roleService.findByKey(RolesKeys.User);

      this.rolePermissionService.addPermission(role.id, permission.id);
    }

  }

}
