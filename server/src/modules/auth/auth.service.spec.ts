import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/nestjs-testing';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userRepo: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: createMock<Repository<Users>>(),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue({
              user: {
                username: 'dimas',
              },
              accessToken: '123456',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof userRepo.find).toBe('function');
  });

  describe('jwtService', () => {
    it('should able to call jwt service', () => {
      expect(jwtService.sign({})).resolves.toEqual({
        user: {
          username: 'dimas',
        },
        accessToken: '123456',
      });
    });
  });
});
