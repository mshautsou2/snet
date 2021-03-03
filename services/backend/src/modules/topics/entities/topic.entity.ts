import { Category } from "src/modules/categories/categories.entity";
import { BaseEntity } from "src/modules/shared/entitiy/base.entity";
import { SubTopic } from "src/modules/subtopics/entities/subtopic.entity";
import { User } from "src/modules/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'topic' })
export class Topic extends BaseEntity {

  @Column('varchar', { length: 256 })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => SubTopic, (t: SubTopic) => t.topic)
  subtopics: SubTopic[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id'})
  owner: User;
}

