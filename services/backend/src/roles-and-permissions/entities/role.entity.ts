import { Entity, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { Permission } from './permission.entity';

@Entity()
@Unique(['key'])
export class Role extends BaseEntity {
  @Column('varchar', { length: 256 })
  title: string;

  @Column('varchar', { length: 64 })
  key: string;

  @Column()
  description: string;

  // @OneToMany(type => )
  @ManyToMany((type) => Permission)
  @JoinTable()
  permissions: Permission[];
}
