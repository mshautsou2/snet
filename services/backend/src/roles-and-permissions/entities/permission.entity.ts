import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { Role } from './role.entity';

@Entity({ name: 'permission' })
@Unique(['key'])
export class Permission extends BaseEntity {
  @Column('varchar', { length: 256 })
  key: string;

  @Column('varchar', { length: 256 })
  title: string;

  @Column()
  description: string;

  @ManyToMany((type) => Role, (role) => role.permissions)
  @JoinTable()
  roles: Role[];
}
