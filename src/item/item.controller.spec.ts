import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let service: any;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [{ provide: ItemService, useValue: mockService }],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    const dto = { title: 'Test' };
    const req = { user: { userId: 1 } };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    expect(await controller.create(dto, req)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto, 1);
  });
});
