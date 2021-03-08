import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Topic } from '../topic/topic.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @Column()
  description: string;

  @OneToMany(() => Topic, (t: Topic) => t.category)
  topics: Topic[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  constructor(body: Partial<Category>) {
    super();
    Object.assign(this, body);
  }
}
