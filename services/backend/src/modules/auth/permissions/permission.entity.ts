import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/modules/shared/entitiy/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity({ name: 'permission' })
@Unique(['key'])
export class Permission extends BaseEntity {
  @ApiProperty()
  @Column('varchar', { length: 256 })
  key: string;

  @ApiProperty()
  @Column('varchar', { length: 256 })
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  constructor(raw: Partial<Permission>) {
    super();
    Object.assign(this, raw);
  }
}
