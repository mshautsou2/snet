import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtopicController } from './subtopic.controller';
import { SubtopicRepository } from './subtopic.repository';
import { SubtopicService } from './subtopic.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubtopicRepository])],
  providers: [SubtopicService, SubtopicController],
  controllers: [SubtopicController],
})
export class SubtopicModule {}
