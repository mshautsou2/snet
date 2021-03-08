import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'modules/auth/users/user.entity';
import { BaseEntity } from 'modules/shared/entitiy/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Subtopic } from '../subtopic/subtopic.entity';

@Entity({ name: 'topic' })
export class Topic extends BaseEntity {
  @ApiProperty({ required: true })
  @IsString()
  @Column('varchar', { length: 256 })
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @Column()
  description: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Subtopic, (t: Subtopic) => t.topic)
  subtopics: Subtopic[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  constructor(body: Partial<Topic>) {
    super();
    Object.assign(this, body);
  }
}
