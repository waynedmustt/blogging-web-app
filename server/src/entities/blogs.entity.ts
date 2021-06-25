import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from './comments.entity';
import { Users } from './users.entity';

@Entity()
export class Blogs {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 20 })
  code: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'integer' })
  view: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // eslint-disable-next-line
  @ManyToOne((type) => Users, (user) => user.blog)
  user: Users;

  // eslint-disable-next-line
  @OneToMany((type) => Comments, (comment) => comment.blog, {
    cascade: ['remove'],
  })
  comment: Comments[];
}
