import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/modules/categories/categoires.repository';
import { CategoriesController } from 'src/modules/categories/categories.controller';
import { CategoryService } from 'src/modules/categories/categories.service';
import { UsersModule } from 'src/modules/auth/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    RolesModule,
    UsersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
