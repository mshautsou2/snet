import { Entity, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { Permission } from './permission.entity';

@Entity()
@Unique(['name'])
export class Role extends BaseEntity {
  @Column('varchar', { length: 256 })
  key: string;

  @Column('varchar', { length: 64 })
  name: string;

  @Column()
  description: string;

  // @OneToMany(type => )
  @ManyToMany((type) => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
