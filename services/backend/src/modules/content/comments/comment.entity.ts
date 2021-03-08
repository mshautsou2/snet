import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: string;

  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  message: Message;

  @ManyToOne(() => User, { eager: true })
  owner: User;

  constructor(raw: Partial<Comment>) {
    super();
    Object.assign(this, raw);
  }
}
