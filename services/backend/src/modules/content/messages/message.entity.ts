import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { Subtopic } from '../subtopic/subtopic.entity';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: string;

  @ManyToOne(() => Subtopic, { onDelete: 'CASCADE' })
  subtopic: Subtopic;

  @OneToMany(() => Comment, (c: Comment) => c.message)
  comments: Message[];

  @ManyToOne(() => User, { eager: true })
  owner: User;

  constructor(body: Partial<Message>) {
    super();
    Object.assign(this, body);
  }
}
