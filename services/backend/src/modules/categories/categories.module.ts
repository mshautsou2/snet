import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/modules/roles-and-permissions/roles-and-permissions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { CategoryRepository } from 'src/modules/categories/categoires.repository';
import { CategoriesController } from 'src/modules/categories/categories.controller';
import { CategoryService } from 'src/modules/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), RolesAndPermissionsModule, UsersModule],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule { }
