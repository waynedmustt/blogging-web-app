import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comments } from '../../entities/comments.entity';
import { Repository } from 'typeorm';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepo: Repository<Comments>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comments),
          useValue: createMock<Repository<Comments>>(),
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepo = module.get<Repository<Comments>>(
      getRepositoryToken(Comments),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof commentRepo.find).toBe('function');
  });
});
