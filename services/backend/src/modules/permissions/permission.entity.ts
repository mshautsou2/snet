import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from 'src/modules/shared/entitiy/base.entity';

@Entity({ name: 'permission' })
@Unique(['key'])
export class Permission extends BaseEntity {
  @Column('varchar', { length: 256 })
  key: string;

  @Column('varchar', { length: 256 })
  title: string;

  @Column()
  description: string;
}
