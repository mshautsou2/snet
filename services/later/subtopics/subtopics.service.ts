import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/modules/messages/entities/message.entity';
import { TopicsService } from 'src/modules/topics/topics.service';
import { UsersService } from 'src/modules/auth/users/users.service';
import { getConnection, Repository } from 'typeorm';
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

  async findMessagesAndComments(subtopicId: string, limit: number): Promise<Message[]> {
    return await getConnection()
      .getRepository(Message)
      .createQueryBuilder('message')
      .where('message.subtopic.id = :subtopicId', { subtopicId })
      .leftJoinAndSelect('message.comments', 'comment')
      .addOrderBy('message.timestamp', 'DESC')
      .limit(limit)
      .getMany()
  }

  async findOne(id: string) {
    return await this.repository.findOne(id, {
      join: {
        alias: 'subtopics',
        leftJoinAndSelect: {
          messages: 'subtopics.messages',
        },

      }
    });
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
