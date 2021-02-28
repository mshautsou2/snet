import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicsService } from 'src/topics/topics.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSubTopicDTO } from './dto/create-sub-topic.dto';
import { UpdateSubTopicDto } from './dto/update-topic.dto';
import { SubTopic } from './entities/subtopic.entity';

@Injectable()
export class SubTopicsService {


  constructor(
    @InjectRepository(SubTopic)
    private repository: Repository<SubTopic>,
    private userService: UsersService,
    private topicService: TopicsService,
  ) { }

  async create(createTopicDto: CreateSubTopicDTO) {
    const topic = await this.topicService.findOne(createTopicDto.topicId);

    if (!topic) {
      throw new NotFoundException(`Topic with id "${createTopicDto.topicId}" not found`);
    }
    return await this.repository.save({
      ...createTopicDto,
      owner: await this.userService.findOne(createTopicDto.ownerId),
      topic: await this.topicService.findOne(createTopicDto.topicId),
    })
  }

  async isOwner(userId: string, subtopicId: string) {
    return await this.repository.createQueryBuilder('subtopic')
      .where('subtopic.id = :subtopicId', { subtopicId })
      .leftJoin('subtopic.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }


  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateSubTopicDto: UpdateSubTopicDto) {
    const toUpdate = await this.repository.findOne(id);
    if (!toUpdate) {
      throw new NotFoundException(`Subtopic with id "${id}" not found`);
    }
    return await this.repository.save({
      ...toUpdate,
      ...updateSubTopicDto,
      owner: toUpdate.owner,
      topic: toUpdate.topic,
    });
  }

  async remove(id: string) {
    const toDelete = await this.repository.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`SubTopic with id "${id}" not found`);
    }
    return await this.repository.remove(toDelete);
  }
}
