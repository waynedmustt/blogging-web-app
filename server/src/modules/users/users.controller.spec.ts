import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Roles } from '../../entities/roles.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            register: jest
              .fn()
              .mockImplementation((body: any) => Promise.resolve(body)),
            get: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                username: 'dimas',
                firstName: 'dimas',
                lastName: 'dewantara',
                id: id,
              }),
            ),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: createMock<Repository<Users>>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return users by id', async () => {
      expect(service.get('1')).resolves.toEqual({
        username: 'dimas',
        firstName: 'dimas',
        lastName: 'dewantara',
        id: '1',
      });
    });
  });

  describe('register', () => {
    it('should able to call register service', async () => {
      const roles = new Roles();
      roles.createdAt = new Date('2021-06-25T11:01:58.135Z');
      expect(
        controller.register({
          id: 0,
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          isActive: true,
          createdAt: new Date('2021-06-25T11:01:58.135Z'),
          updatedAt: new Date('2021-06-25T11:01:58.135Z'),
          comment: [],
          role: roles,
          blog: [],
        }),
      ).resolves.toEqual({
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        isActive: true,
        createdAt: new Date('2021-06-25T11:01:58.135Z'),
        updatedAt: new Date('2021-06-25T11:01:58.135Z'),
        comment: [],
        role: roles,
        blog: [],
      });
    });
  });
});
