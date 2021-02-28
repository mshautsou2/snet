import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/categories.entity';
import { UsersService } from 'src/users/users.service';
import { RolesAndPermissionsService } from 'src/roles-and-permissions/services/roles-and-permissions.service';
import { PermissionService } from 'src/roles-and-permissions/services/permission.service';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), RolesAndPermissionsModule, UsersModule],
  controllers: [CategoriesController],
  providers: [CategoryService]
})
export class CategoryModule { }
