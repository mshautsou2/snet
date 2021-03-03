import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/modules/categories/categories.service';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {

  constructor(
    @InjectRepository(Topic)
    private repository: Repository<Topic>,
    private userService: UsersService,
    private categoryService: CategoryService,
  ) { }

  async create(createTopicDto: CreateTopicDto) {
    const category = await this.categoryService.findOne(createTopicDto.categoryId);
    const owner = await this.userService.findOne(createTopicDto.ownerId)
    if (!category || !owner) {
      return false;
    }
    return await this.repository.save({
      ...createTopicDto,
      owner,
      category,
    })
  }

  async isOwner(userId: string, topicId: string) {
    return await this.repository.createQueryBuilder('topic')
      .where('topic.id = :topicId', { topicId })
      .leftJoin('topic.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id, {
      join: {
        alias: 'topics',
        leftJoinAndSelect: {
          subtopics: 'topics.subtopics',
        },

      }
    });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const toUpdate = await this.repository.findOne(id);
    if (!toUpdate) {
      throw new NotFoundException(`Topic with id "${id}" not found`);
    }
    return await this.repository.save({
      ...toUpdate,
      ...updateTopicDto,
      owner: toUpdate.owner,
      categoryId: toUpdate.category,
    });
  }

  async remove(id: string) {
    const toDelete = await this.repository.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Topic with id "${id}" not found`);
    }
    return await this.repository.remove(toDelete);
  }
}
