import { BaseEntity } from "src/shared/entitiy/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";


@Entity({ name: 'category' })
export class Category extends BaseEntity {

  @Column('varchar', { length: 256 })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  owner: User;

}

