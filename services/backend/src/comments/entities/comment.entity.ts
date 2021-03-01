import { Message } from "src/messsages/entities/message.entity";
import { BaseEntity } from "src/shared/entitiy/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {

  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: string;

  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  message: Message;

  @ManyToOne(() => User, { eager: true })
  owner: User;

}

