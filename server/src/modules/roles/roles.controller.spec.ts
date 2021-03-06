import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from '../../entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                name: 'public',
                type: 'Public',
              },
            ]),
          },
        },
        {
          provide: getRepositoryToken(Roles),
          useValue: createMock<Repository<Roles>>(),
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return all roles', async () => {
      expect(controller.getAll()).resolves.toEqual([
        {
          name: 'public',
          type: 'Public',
        },
      ]);
    });
  });
});
