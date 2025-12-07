import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: any;

  const mockService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto = { email: 'test@test.com', password: 'password' };
    mockService.register.mockResolvedValue({
      message: 'Registered successfully',
    });

    expect(await controller.register(dto)).toEqual({
      message: 'Registered successfully',
    });
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('should login a user', async () => {
    const dto = { email: 'test@test.com', password: 'password' };
    mockService.login.mockResolvedValue({ access_token: 'token' });

    expect(await controller.login(dto)).toEqual({ access_token: 'token' });
    expect(service.login).toHaveBeenCalledWith(dto);
  });
});
