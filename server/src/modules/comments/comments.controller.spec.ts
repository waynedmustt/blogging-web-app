import { Test, TestingModule } from '@nestjs/testing';
import { Comments } from '../../entities/comments.entity';
import { Repository } from 'typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/nestjs-testing';
import { Users } from '../../entities/users.entity';
import { Blogs } from '../../entities/blogs.entity';

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((body: any) => Promise.resolve(body)),
          },
        },
        {
          provide: getRepositoryToken(Comments),
          useValue: createMock<Repository<Comments>>(),
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should able to call create service', async () => {
      const user = new Users();
      user.createdAt = new Date('2021-06-25T11:01:58.135Z');
      user.updatedAt = new Date('2021-06-25T11:01:58.135Z');
      const blog = new Blogs();
      blog.createdAt = new Date('2021-06-25T11:01:58.135Z');
      blog.updatedAt = new Date('2021-06-25T11:01:58.135Z');
      expect(
        controller.create({
          id: 0,
          comment: '',
          createdAt: new Date('2021-06-25T11:01:58.135Z'),
          user: user,
          blog: blog,
        }),
      ).resolves.toEqual({
        id: 0,
        comment: '',
        createdAt: new Date('2021-06-25T11:01:58.135Z'),
        user: user,
        blog: blog,
      });
    });
  });
});
