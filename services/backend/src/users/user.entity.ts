import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles-and-permissions/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 256 })
  username: string;

  @Column('varchar', { length: 256 })
  email: string;

  @Column('varchar', { length: 256 })
  password: string;

  @ManyToMany((type) => Role)
  @JoinTable()
  roles: Role[];
}
