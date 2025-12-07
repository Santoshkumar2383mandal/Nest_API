import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let repo: any;
  let jwt: any;

  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwt = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    jwt = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      repo.findOne.mockResolvedValue(null);
      repo.create.mockReturnValue({ id: 1, email: 'test@test.com' });
      repo.save.mockResolvedValue({ id: 1, email: 'test@test.com' });

      const result = await service.register({
        email: 'test@test.com',
        password: 'password',
      });
      expect(result).toEqual({ message: 'Registered successfully' });
    });

    it('should throw if email exists', async () => {
      repo.findOne.mockResolvedValue({ id: 1 });
      await expect(
        service.register({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
