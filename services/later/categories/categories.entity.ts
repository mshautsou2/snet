import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/shared/entitiy/base.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { User } from 'src/modules/auth/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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
}
