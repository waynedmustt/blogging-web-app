import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blogs } from './blogs.entity';
import { Users } from './users.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // eslint-disable-next-line
  @ManyToOne((type) => Users, (user) => user.comment)
  user: Users;

  // eslint-disable-next-line
  @ManyToOne((type) => Blogs, (blog) => blog.comment)
  blog: Blogs;
}
