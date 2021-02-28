import { Comment } from "src/comments/entities/comment.entity";
import { BaseEntity } from "src/shared/entitiy/base.entity";
import { SubTopic } from "src/subtopics/entities/subtopic.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: 'message' })
export class Message extends BaseEntity {

  @Column('varchar', { length: 256 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: string;

  @ManyToOne(() => SubTopic, { onDelete: 'CASCADE' })
  subtopic: SubTopic;

  @OneToMany(() => Comment, (c: Comment) => c.message)
  comments: Message[];

  @ManyToOne(() => User, { eager: true })
  owner: User;


}

