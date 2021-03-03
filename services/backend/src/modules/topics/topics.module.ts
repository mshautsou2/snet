import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { CategoryModule } from 'src/modules/categories/categories.module';
import { Topic } from './entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/modules/permissions/roles-and-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), RolesAndPermissionsModule, UsersModule, CategoryModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule { }
