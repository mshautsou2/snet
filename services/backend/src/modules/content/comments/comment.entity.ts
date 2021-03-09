import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: string;

  @ApiProperty({ required: true, type: 'string', name: 'messageId' })
  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  constructor(raw: Partial<Comment>) {
    super();
    Object.assign(this, raw);
  }
}
