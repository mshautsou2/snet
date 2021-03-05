import { BaseEntity } from 'src/modules/shared/entitiy/base.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Column('varchar', { length: 256 })
  username: string;

  @Column('varchar', { length: 256 })
  email: string;

  @Column('varchar', { length: 256 })
  password: string;

  @ManyToMany((type) => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  constructor(body: Partial<User>) {
    super();
    Object.assign(this, body);
  }
}
