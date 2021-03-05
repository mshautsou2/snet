import { User } from 'src/modules/auth/users/user.entity';
import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export abstract class WithOwnerEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
