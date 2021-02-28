import { Category } from "src/categories/entities/categories.entity";
import { BaseEntity } from "src/shared/entitiy/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity({ name: 'topic' })
export class Topic extends BaseEntity {

  @Column('varchar', { length: 256 })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE'})
  category: Category;

  @ManyToOne(() => User, { eager: true })
  owner: User;


}

