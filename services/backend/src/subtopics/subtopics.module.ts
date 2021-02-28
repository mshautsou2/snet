import { Module } from '@nestjs/common';
import { SubTopicsService } from './subtopics.service';
import { SubTopicsController } from './subtopics.controller';
import { UsersModule } from 'src/users/users.module';
import { SubTopic } from './entities/subtopic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesAndPermissionsModule } from 'src/roles-and-permissions/roles-and-permissions.module';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([ SubTopic ]), RolesAndPermissionsModule, UsersModule, TopicsModule],
  controllers: [SubTopicsController],
  providers: [SubTopicsService]
})
export class SubTopicsModule {}
