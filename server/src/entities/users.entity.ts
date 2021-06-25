import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blogs } from './blogs.entity';
import { Comments } from './comments.entity';
import { Roles } from './roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 255 })
  firstName: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @Column('varchar', { length: 255 })
  username: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // eslint-disable-next-line
  @OneToOne((type) => Roles, (role) => role.user, { cascade: ['update'] })
  @JoinColumn()
  role: Roles;

  // eslint-disable-next-line
  @OneToMany((type) => Blogs, (blog) => blog.user, { cascade: ['remove'] })
  blog: Blogs[];

  // eslint-disable-next-line
  @OneToMany((type) => Comments, (comment) => comment.user, {
    cascade: ['remove'],
  })
  comment: Comments[];
}
