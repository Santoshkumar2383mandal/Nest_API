import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('ItemService', () => {
  let service: ItemService;
  let repo: any;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: getRepositoryToken(Item), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
    repo = module.get(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const dto = { title: 'Test Item' };
      const userId = 1;
      repo.create.mockReturnValue({ ...dto, owner: { id: userId } });
      repo.save.mockResolvedValue({ id: 1, ...dto, owner: { id: userId } });

      const result = await service.create(dto, userId);
      expect(result).toEqual({ id: 1, ...dto, owner: { id: userId } });
    });
  });

  describe('findOne', () => {
    it('should return an item', async () => {
      const item = { id: 1, title: 'Test' };
      repo.findOne.mockResolvedValue(item);

      const result = await service.findOne(1);
      expect(result).toEqual(item);
    });

    it('should throw if not found', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
