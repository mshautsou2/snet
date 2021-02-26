import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles-and-permissions/entities/role.entity';

@Entity()
export class User {
  @Column('varchar', { length: 256 })
  username: string;

  @Column('varchar', { length: 256 })
  email: string;

  @Column('varchar', { length: 256 })
  password: string;

  @ManyToOne((type) => Role)
  roles: Role[];
}
