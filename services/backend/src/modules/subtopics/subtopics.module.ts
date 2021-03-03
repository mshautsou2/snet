import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/modules/permissions/roles-and-permissions.module';
import { TopicsModule } from 'src/modules/topics/topics.module';
import { UsersModule } from 'src/modules/users/users.module';
import { SubTopic } from './entities/subtopic.entity';
import { SubTopicsController } from './subtopics.controller';
import { SubTopicsService } from './subtopics.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubTopic]), RolesAndPermissionsModule, UsersModule, TopicsModule],
  controllers: [SubTopicsController],
  providers: [SubTopicsService],
  exports: [SubTopicsService],
})
export class SubTopicsModule { }
