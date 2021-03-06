import { Message } from "src/modules/messages/entities/message.entity";
import { BaseEntity } from "src/modules/shared/entitiy/base.entity";
import { Topic } from "src/modules/topics/entities/topic.entity";
import { User } from "src/modules/auth/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'subtopic' })
export class SubTopic extends BaseEntity {

  @Column('varchar', { length: 256 })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
  topic: Topic;

  @OneToMany(() => Message, (m: Message) => m.subtopic)
  messages: Message[];

  @ManyToOne(() => User, { eager: true })
  owner: User;

}

