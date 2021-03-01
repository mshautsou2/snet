import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { UsersModule } from 'src/users/users.module';
import { CategoryRepository } from './categoires.repository';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), RolesAndPermissionsModule, UsersModule],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule { }
