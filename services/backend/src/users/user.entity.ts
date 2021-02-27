import { BaseEntity } from 'src/shared/entitiy/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../roles-and-permissions/entities/role.entity';

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
  @JoinTable()
  roles: Role[];

  toSanitizedEntity(): Omit<User, 'password'> {
    const { password, ...sanitizedUser} = this;
    return sanitizedUser;
  }
}
