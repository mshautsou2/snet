import { Category } from "src/categories/entities/categories.entity";
import { BaseEntity } from "src/shared/entitiy/base.entity";
import { SubTopic } from "src/subtopics/entities/subtopic.entity";
import { Topic } from "src/topics/entities/topic.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity({ name: 'message' })
export class Message extends BaseEntity {

  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  timestamp: string;

  @ManyToOne(() => SubTopic, { onDelete: 'CASCADE'})
  subtopic: SubTopic;

  @ManyToOne(() => User, { eager: true })
  owner: User;


}

