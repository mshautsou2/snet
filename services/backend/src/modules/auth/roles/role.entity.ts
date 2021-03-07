import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { Permission } from '../permissions/permission.entity';

@Entity({ name: 'role' })
@Unique(['key'])
export class Role extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 256 })
  title: string;

  @ApiProperty()
  @Column('varchar', { length: 64 })
  key: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  constructor(body: Partial<Role>) {
    super();
    Object.assign(this, body);
  }
}
