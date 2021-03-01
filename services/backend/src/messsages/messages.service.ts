import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubTopicsService } from 'src/subtopics/subtopics.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto/create-message.dto';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
    private userService: UsersService,
    private subTopicService: SubTopicsService,
  ) { }

  async create(createTopicDto: CreateMessageDTO) {
    const subtopic = await this.subTopicService.findOne(createTopicDto.subtopicId);

    if (!subtopic) {
      throw new NotFoundException(`Subtopic with id "${createTopicDto.subtopicId}" not found`);
    }
    return await this.repository.save({
      ...createTopicDto,
      owner: await this.userService.findOne(createTopicDto.ownerId),
      subtopic: await this.subTopicService.findOne(createTopicDto.subtopicId),
    })
  }

  async isOwner(userId: string, messageId: string) {
    return await this.repository.createQueryBuilder('message')
      .where('message.id = :messageId', { messageId })
      .leftJoin('message.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .getCount() > 0
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateMessageDto: UpdateMessageDTO) {
    const toUpdate = await this.repository.findOne(id);
    if (!toUpdate) {
      throw new NotFoundException(`Message with id "${id}" not found`);
    }
    return await this.repository.save({
      ...toUpdate,
      ...updateMessageDto,
      owner: toUpdate.owner,
      subtopic: toUpdate.subtopic,
    });
  }

  async remove(id: string) {
    const toDelete = await this.repository.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Message with id "${id}" not found`);
    }
    return await this.repository.remove(toDelete);
  }
}
