import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 256 })
  username: string;

  @ApiProperty()
  @Column('varchar', { length: 256 })
  email: string;

  @Exclude()
  @ApiProperty()
  @Column('varchar', { length: 256 })
  password: string;

  @Exclude()
  @OneToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Exclude()
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  constructor(body: Partial<User>) {
    super();
    Object.assign(this, body);
  }
}
