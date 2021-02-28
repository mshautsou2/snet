import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CategoryModule } from 'src/categories/categories.module';
import { Topic } from './entities/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Topic ]), RolesAndPermissionsModule, UsersModule, CategoryModule],
  controllers: [TopicsController],
  providers: [TopicsService]
})
export class TopicsModule {}
