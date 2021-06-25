import { Repository, EntityRepository } from 'typeorm';
import { Comments } from '../../entities/comments.entity';

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {}
