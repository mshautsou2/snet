import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Message } from '../messages/message.entity';
import { Topic } from '../topic/topic.entity';

@Entity({ name: 'subtopic' })
export class Subtopic extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @Column()
  description: string;

  @ApiProperty({ required: true, type: 'string', name: 'topicId' })
  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @OneToMany(() => Message, (t: Message) => t.subtopic)
  messages: Message[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  constructor(body: Partial<Subtopic>) {
    super();
    Object.assign(this, body);
  }
}
