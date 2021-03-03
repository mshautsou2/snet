import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/entitiy/base.entity';
import { Permission } from './permission.entity';

@Entity({ name: 'role' })
@Unique(['key'])
export class Role extends BaseEntity {
  @Column('varchar', { length: 256 })
  title: string;

  @Column('varchar', { length: 64 })
  key: string;

  @Column()
  description: string;

  @ManyToMany((type) => Permission)
  @JoinTable({
    name: 'role_permissions_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
  })
  permissions: Permission[];
}
