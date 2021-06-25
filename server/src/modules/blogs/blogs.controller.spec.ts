import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { createMock } from '@golevelup/nestjs-testing';
import { BlogsService } from './blogs.service';
import { Repository } from 'typeorm';
import { Blogs } from '../../entities/blogs.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';

describe('BlogsController', () => {
  let controller: BlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        {
          provide: BlogsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((body: any) => Promise.resolve(body)),
            update: jest.fn().mockImplementation((code: any, body: any) =>
              Promise.resolve({
                body: body,
                code: code,
              }),
            ),
            delete: jest.fn().mockImplementation((id: any) =>
              Promise.resolve({
                id: id,
              }),
            ),
            get: jest.fn().mockImplementation((code: string) =>
              Promise.resolve({
                title: 'first blog',
                content: 'content first blog',
                view: 1,
                code: code,
              }),
            ),
            getAll: jest.fn().mockResolvedValue([
              {
                title: 'first blog',
                content: 'content first blog',
                view: 1,
              },
              {
                title: 'second blog',
                content: 'content second blog',
                view: 1,
              },
            ]),
          },
        },
        {
          provide: getRepositoryToken(BlogsService),
          useValue: createMock<Repository<Blogs>>(),
        },
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return blog by code', async () => {
      expect(controller.findOne('BLOG1')).resolves.toEqual({
        title: 'first blog',
        content: 'content first blog',
        view: 1,
        code: 'BLOG1',
      });
    });

    it('should return all blogs', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          title: 'first blog',
          content: 'content first blog',
          view: 1,
        },
        {
          title: 'second blog',
          content: 'content second blog',
          view: 1,
        },
      ]);
    });
  });

  describe('delete', () => {
    it('should delete blog by id', async () => {
      expect(controller.delete('1')).resolves.toEqual({
        id: '1',
      });
    });
  });

  describe('create', () => {
    it('should able to create blog', async () => {
      const users = new Users();
      users.createdAt = new Date('2021-06-25T11:01:58.135Z');
      expect(
        controller.create({
          id: 0,
          code: '',
          title: '',
          content: '',
          view: 0,
          status: 'Active',
          createdAt: new Date('2021-06-25T11:01:58.135Z'),
          updatedAt: new Date('2021-06-25T11:01:58.135Z'),
          comment: [],
          user: users,
        }),
      ).resolves.toEqual({
        id: 0,
        code: '',
        title: '',
        content: '',
        view: 0,
        status: 'Active',
        createdAt: new Date('2021-06-25T11:01:58.135Z'),
        updatedAt: new Date('2021-06-25T11:01:58.135Z'),
        comment: [],
        user: users,
      });
    });
  });

  describe('create', () => {
    it('should able to update blog', async () => {
      const users = new Users();
      users.createdAt = new Date('2021-06-25T11:01:58.135Z');
      expect(
        controller.update('BLOG1', {
          id: 0,
          code: '',
          title: '',
          content: '',
          view: 0,
          status: 'Active',
          createdAt: new Date('2021-06-25T11:01:58.135Z'),
          updatedAt: new Date('2021-06-25T11:01:58.135Z'),
          comment: [],
          user: users,
        }),
      ).resolves.toEqual({
        body: {
          id: 0,
          code: '',
          title: '',
          content: '',
          view: 0,
          status: 'Active',
          createdAt: new Date('2021-06-25T11:01:58.135Z'),
          updatedAt: new Date('2021-06-25T11:01:58.135Z'),
          comment: [],
          user: users,
        },
        code: 'BLOG1',
      });
    });
  });
});
