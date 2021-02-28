import { BaseEntity } from "src/shared/entitiy/base.entity";
import { Topic } from "src/topics/entities/topic.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: 'category' })
export class Category extends BaseEntity {

  @Column('varchar', { length: 256 })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Topic, (t: Topic) => t.category)
  topics: Topic[];

  @ManyToOne(() => User)
  owner: User;

}

