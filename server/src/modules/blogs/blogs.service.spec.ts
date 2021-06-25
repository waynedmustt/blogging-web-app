import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Blogs } from '../../entities/blogs.entity';
import { Repository } from 'typeorm';
import { BlogsService } from './blogs.service';

describe('BlogsService', () => {
  let service: BlogsService;
  let blogRepo: Repository<Blogs>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getRepositoryToken(Blogs),
          useValue: createMock<Repository<Blogs>>(),
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    blogRepo = module.get<Repository<Blogs>>(getRepositoryToken(Blogs));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof blogRepo.find).toBe('function');
  });
});
