import { Message } from "src/messsages/entities/message.entity";
import { BaseEntity } from "src/shared/entitiy/base.entity";
import { Topic } from "src/topics/entities/topic.entity";
import { User } from "src/users/user.entity";
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

