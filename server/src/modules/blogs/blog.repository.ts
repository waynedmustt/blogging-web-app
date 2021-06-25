import { Repository, EntityRepository } from 'typeorm';
import { Blogs } from '../../entities/blogs.entity';

@EntityRepository(Blogs)
export class BlogsRepository extends Repository<Blogs> {}
